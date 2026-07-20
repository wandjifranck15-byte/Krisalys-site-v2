import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

// Endpoint de réception du formulaire de contact.
// TODO (production) : brancher un service d'envoi d'email transactionnel
// (ex. Resend, Postmark) en utilisant RESEND_API_KEY et CONTACT_EMAIL_TO
// définis dans .env. Pour l'instant, la requête est validée et journalisée
// côté serveur ; aucun email n'est réellement envoyé tant que ce service
// n'est pas connecté.
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

    // Emplacement prévu pour l'intégration future du service d'email
    // et/ou de la sauvegarde en base de données (voir README > Espace admin).
    console.log("Nouvelle demande de simulation reçue :", parsed.data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
