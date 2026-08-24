import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { syncContactToHubSpot } from "@/lib/hubspot";

// Endpoint de réception du formulaire de contact / simulation.
// Envoi de l'email transactionnel via l'API REST de Resend
// (RESEND_API_KEY et CONTACT_EMAIL_TO définis dans .env).

const RESEND_API_URL = "https://api.resend.com/emails";

// Expéditeur technique : domaine krisalysglobal.com vérifié dans Resend.
const EMAIL_FROM = "KRISALYS <no-reply@krisalysglobal.com>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(data: ContactFormValues): string {
  const rows: [string, string][] = [
    ["Nom", data.name],
    ["Société", data.company || "—"],
    ["Téléphone", data.phone],
    ["Email", data.email],
    ["Ville", data.city],
    ["Type de bâtiment", data.buildingType],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#115DB2;">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111;">
      <h2 style="color:#115DB2;">Nouvelle demande de simulation — KRISALYS</h2>
      <table style="border-collapse:collapse;">${rowsHtml}</table>
      <p style="margin-top:16px;font-weight:600;">Message :</p>
      <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.CONTACT_EMAIL_TO;

    if (!apiKey || !emailTo) {
      console.error(
        "Configuration email manquante : RESEND_API_KEY et/ou CONTACT_EMAIL_TO ne sont pas définis dans l'environnement."
      );
      return NextResponse.json(
        { success: false, error: "email_service_not_configured" },
        { status: 500 }
      );
    }

    const data = parsed.data;

    let resendResponse: Response;
    try {
      resendResponse = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [emailTo],
          reply_to: data.email,
          subject: `Nouvelle demande de simulation — ${data.name} (${data.city})`,
          html: buildEmailHtml(data),
        }),
      });
    } catch (networkError) {
      // Échec réseau (DNS, timeout, Resend injoignable, etc.)
      console.error("Erreur réseau lors de l'appel à Resend :", networkError);
      return NextResponse.json(
        { success: false, error: "email_send_network_error" },
        { status: 502 }
      );
    }

    if (!resendResponse.ok) {
      // Resend a répondu mais avec une erreur (clé invalide, domaine non vérifié,
      // quota dépassé, adresse "from" non autorisée, etc.)
      let errorBody: unknown;
      try {
        errorBody = await resendResponse.json();
      } catch {
        errorBody = await resendResponse.text().catch(() => null);
      }
      console.error(
        `Resend a refusé l'envoi (statut ${resendResponse.status}) :`,
        errorBody
      );
      return NextResponse.json(
        { success: false, error: "email_send_rejected" },
        { status: 502 }
      );
    }

    // Synchronisation HubSpot best-effort : ne s'exécute que si
    // HUBSPOT_ACCESS_TOKEN est configuré (voir lib/hubspot.ts), et ne doit
    // jamais faire échouer la soumission du formulaire ni l'email Resend
    // déjà envoyé avec succès ci-dessus.
    try {
      const hubspotResult = await syncContactToHubSpot(data);
      if (!hubspotResult.skipped && !hubspotResult.ok) {
        console.error("Synchronisation HubSpot non aboutie (voir logs ci-dessus).");
      }
    } catch (hubspotError) {
      console.error("Erreur inattendue lors de la synchronisation HubSpot :", hubspotError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur inattendue dans la route /api/contact :", error);
    return NextResponse.json({ success: false, error: "unexpected_error" }, { status: 500 });
  }
}
