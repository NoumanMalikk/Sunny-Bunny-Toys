import { z } from "zod";
import { contactTopicValues } from "@/data/contact-topics";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const requestLog = new Map<string, number[]>();

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  product: z.string().trim().optional(),
  orderReference: z.string().trim().optional(),
  topic: z.enum(contactTopicValues, { message: "Please select a topic." }),
  message: z.string().trim().min(10, "Please include a few more details in your message."),
  consent: z.literal(true, {
    message: "Please confirm you are an adult purchaser and consent to contact.",
  }),
  website: z.string().max(0).optional(),
});

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return Response.json(
        { ok: false, message: "Too many messages sent recently. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();

    if (body.website) {
      return Response.json({ ok: true, message: "Message received." });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }

      return Response.json(
        {
          ok: false,
          message: parsed.error.issues[0]?.message ?? "Invalid request.",
          fieldErrors,
        },
        { status: 400 },
      );
    }

    // Demo mode: acknowledge without persisting PII.
    // Connect to Resend or your support inbox in production.
    return Response.json({
      ok: true,
      message: "Thank you. your message has been received. We will respond as soon as we can.",
    });
  } catch {
    return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }
}
