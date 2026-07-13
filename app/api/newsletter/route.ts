import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  marketingConsent: z.boolean().optional().default(false),
  adultConfirmed: z.literal(true, {
    message: "Newsletter sign-up is for adults only (18+).",
  }).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 },
      );
    }

    // Demo mode: acknowledge subscription without persisting PII.
    // Connect to your email provider (e.g. Resend, Mailchimp) in production.
    console.info("[demo] Newsletter signup received for adult subscriber.");
    return Response.json({
      ok: true,
      message: "Subscription received. Sign-up is for adults only — no child profiles collected.",
    });
  } catch {
    return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }
}
