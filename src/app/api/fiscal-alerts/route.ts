import { NextRequest, NextResponse } from "next/server";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// POST /api/fiscal-alerts — subscribe to fiscal alerts
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body as { email?: string; source?: string };

    if (!email || !email.includes("@")) {
      return json({ ok: false, error: "Valid email is required" }, 400);
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return json({ ok: false, error: "Email service not configured" }, 500);
    }

    try {
      // Import Resend dynamically
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);

      // Create contact in Resend with fiscal alerts tag
      const contact = await resend.contacts.create({
        email,
        firstName: undefined, // We don't collect names for fiscal alerts
        unsubscribed: false,
      });

      if (contact.error) {
        console.error("Resend contact creation failed:", contact.error);

        // Handle duplicate email gracefully
        if (contact.error.message?.includes('already exists')) {
          return json({
            ok: true,
            message: "Email already subscribed to fiscal alerts"
          });
        }

        return json({ ok: false, error: "Failed to subscribe to alerts" }, 500);
      }

      return json({
        ok: true,
        message: "Successfully subscribed to fiscal alerts",
        contactId: contact.data?.id
      });
    } catch (resendError: any) {
      console.error("Resend API error:", resendError);

      // Handle common Resend API errors
      if (resendError.message?.includes('already exists')) {
        return json({
          ok: true,
          message: "Email already subscribed to fiscal alerts"
        });
      }

      return json({ ok: false, error: "Failed to subscribe to alerts" }, 500);
    }
  } catch (error: any) {
    console.error("Fiscal alerts subscription error:", error);
    return json({ ok: false, error: "Failed to subscribe to alerts" }, 500);
  }
}