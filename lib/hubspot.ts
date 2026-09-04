import type { ContactFormValues } from "@/lib/validations/contact";

// Intégration HubSpot CRM — Formulaire KRISALYS → Contact → Entreprise
// (si fournie) → association → Transaction (pipeline commercial réel).
//
// ÉTAT : appel best-effort, entièrement server-side. Si HUBSPOT_ACCESS_TOKEN
// est absent, cette fonction ne fait rien et retourne { skipped: true } — le
// formulaire et Resend continuent de fonctionner normalement (voir route.ts).
//
// CE QUI RESTE À CONFIGURER MANUELLEMENT CÔTÉ FRANCK (voir rapport) :
// 1. HUBSPOT_ACCESS_TOKEN — jeton d'application privée, scopes minimum :
//    crm.objects.contacts.write, crm.objects.companies.write,
//    crm.objects.deals.write. À définir uniquement dans les variables
//    d'environnement Netlify — jamais dans le code, jamais commité dans Git.
// 2. HUBSPOT_DEAL_PIPELINE_ID et HUBSPOT_DEAL_STAGE_NEW — les identifiants
//    internes HubSpot (pas les libellés visibles) du pipeline commercial et
//    de l'étape "Nouveau Prospect". Ces identifiants ne sont pas déductibles
//    du libellé "Nouveau Prospect" fourni dans la demande : HubSpot attribue
//    un ID technique distinct à chaque pipeline/étape personnalisée,
//    consultable dans Paramètres → Objets → Transactions → Pipelines. Tant
//    que ces deux variables ne sont pas définies, la transaction est tout de
//    même créée mais dans le pipeline par défaut du compte HubSpot (à
//    corriger une fois les IDs fournis).
// 3. Les propriétés personnalisées suivantes existent côté HubSpot mais ne
//    sont PAS envoyées ici car le formulaire public ne les collecte pas :
//    Surface LED estimée, Surface vitrée estimée, Solution LED envisagée,
//    Budget estimatif, Objectif du client, Source du prospect, Priorité du
//    projet. Elles doivent être complétées manuellement par les commerciaux
//    après le premier contact — aucune valeur fictive n'est envoyée à leur
//    place.
// 4. Le nom interne HubSpot de la propriété "Type de bâtiment" n'a pas été
//    confirmé ; ce module utilise "building_type" par défaut. À corriger si
//    le nom interne réel diffère (Paramètres → Propriétés → Contact).

const HUBSPOT_API_BASE = "https://api.hubapi.com";

interface HubSpotSyncResult {
  skipped: boolean;
  ok?: boolean;
  contactId?: string;
  companyId?: string;
  dealId?: string;
  step?: "contact" | "company" | "association" | "deal";
  status?: number;
  error?: unknown;
}

async function hubspotFetch(token: string, path: string, body: unknown) {
  return fetch(`${HUBSPOT_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function syncContactToHubSpot(
  data: ContactFormValues
): Promise<HubSpotSyncResult> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    // Intégration non configurée : comportement normal tant que le jeton
    // n'a pas été fourni. Ne bloque jamais le formulaire ni Resend.
    return { skipped: true };
  }

  const [firstname, ...rest] = data.name.trim().split(" ");
  const lastname = rest.join(" ") || firstname;

  // --- 1. Contact ---------------------------------------------------------
  const contactProperties: Record<string, string> = {
    email: data.email,
    firstname,
    lastname,
    phone: data.phone,
    city: data.city,
    message: data.message,
    // Nom de propriété par défaut, à confirmer côté HubSpot (voir point 4).
    building_type: data.buildingType,
  };
  if (data.company) contactProperties.company = data.company;

  let contactId: string;
  try {
    const res = await hubspotFetch(token, "/crm/v3/objects/contacts", {
      properties: contactProperties,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => null);
      console.error(`HubSpot a refusé la création du contact (statut ${res.status}) :`, body);
      return { skipped: false, ok: false, status: res.status, step: "contact" };
    }
    const json = (await res.json()) as { id: string };
    contactId = json.id;
  } catch (error) {
    console.error("Erreur réseau lors de la création du contact HubSpot :", error);
    return { skipped: false, ok: false, error, step: "contact" };
  }

  // --- 2. Entreprise (uniquement si le prospect a renseigné son entreprise) --
  let companyId: string | undefined;
  if (data.company) {
    try {
      const res = await hubspotFetch(token, "/crm/v3/objects/companies", {
        properties: { name: data.company, city: data.city },
      });
      if (res.ok) {
        const json = (await res.json()) as { id: string };
        companyId = json.id;
      } else {
        const body = await res.text().catch(() => null);
        console.error(`HubSpot a refusé la création de l'entreprise (statut ${res.status}) :`, body);
        // Non bloquant : le contact existe déjà, on continue sans entreprise.
      }
    } catch (error) {
      console.error("Erreur réseau lors de la création de l'entreprise HubSpot :", error);
    }
  }

  // --- 3. Association Contact ↔ Entreprise --------------------------------
  if (companyId) {
    try {
      const res = await fetch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`,
        { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) {
        const body = await res.text().catch(() => null);
        console.error(`HubSpot a refusé l'association contact/entreprise (statut ${res.status}) :`, body);
      }
    } catch (error) {
      console.error("Erreur réseau lors de l'association contact/entreprise HubSpot :", error);
    }
  }

  // --- 4. Transaction (deal) -----------------------------------------------
  // Nom de la transaction dérivé des informations réellement soumises
  // (aucune donnée fictive) : nom du prospect + ville + type de bâtiment.
  const dealProperties: Record<string, string> = {
    dealname: `${data.name} — ${data.buildingType} (${data.city})`,
  };
  const pipelineId = process.env.HUBSPOT_DEAL_PIPELINE_ID;
  const stageId = process.env.HUBSPOT_DEAL_STAGE_NEW;
  if (pipelineId) dealProperties.pipeline = pipelineId;
  if (stageId) dealProperties.dealstage = stageId;
  // Volontairement absent : amount / budget — non collecté par le formulaire,
  // ne doit pas être inventé (voir point 3 ci-dessus).

  let dealId: string | undefined;
  try {
    const res = await hubspotFetch(token, "/crm/v3/objects/deals", {
      properties: dealProperties,
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 3,
            },
          ],
        },
        ...(companyId
          ? [
              {
                to: { id: companyId },
                types: [
                  {
                    associationCategory: "HUBSPOT_DEFINED",
                    associationTypeId: 5,
                  },
                ],
              },
            ]
          : []),
      ],
    });
    if (!res.ok) {
      const body = await res.text().catch(() => null);
      console.error(`HubSpot a refusé la création de la transaction (statut ${res.status}) :`, body);
      return { skipped: false, ok: false, contactId, companyId, status: res.status, step: "deal" };
    }
    const json = (await res.json()) as { id: string };
    dealId = json.id;
  } catch (error) {
    console.error("Erreur réseau lors de la création de la transaction HubSpot :", error);
    return { skipped: false, ok: false, contactId, companyId, error, step: "deal" };
  }

  return { skipped: false, ok: true, contactId, companyId, dealId };
}
