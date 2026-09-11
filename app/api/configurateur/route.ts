import { NextRequest, NextResponse } from "next/server";
import { syncConfiguratorSubmission } from "@/lib/hubspot";
import type { ConfiguratorSubmission } from "@/lib/configurator/types";

// Route dédiée au configurateur (distincte de /api/contact — arbitrage
// validé Phase 3, pour ne pas complexifier la route de contact existante).
// Best-effort HubSpot uniquement pour l'instant : pas de notification
// email dédiée au configurateur dans cette phase (hors périmètre validé).
export async function POST(req: NextRequest) {
  try {
    const submission = (await req.json()) as ConfiguratorSubmission;

    if (!submission?.clientDeclaredData?.email || !submission?.clientDeclaredData?.name) {
      return NextResponse.json({ success: false, error: "invalid_submission" }, { status: 400 });
    }

    try {
      const result = await syncConfiguratorSubmission(submission);
      if (!result.skipped && !result.ok) {
        console.error("Synchronisation HubSpot du configurateur non aboutie (voir logs ci-dessus).");
      }
    } catch (hubspotError) {
      console.error("Erreur inattendue lors de la synchronisation HubSpot du configurateur :", hubspotError);
    }

    return NextResponse.json({ success: true, projectId: submission.projectId });
  } catch (error) {
    console.error("Erreur inattendue dans la route /api/configurateur :", error);
    return NextResponse.json({ success: false, error: "unexpected_error" }, { status: 500 });
  }
}
