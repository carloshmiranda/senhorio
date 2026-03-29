import { NextRequest, NextResponse } from "next/server";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// POST /api/waitlist — join the waitlist or verify email
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, verify_only } = body as { email?: string; name?: string; verify_only?: boolean };

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

      if (verify_only) {
        // Verify if email exists in waitlist
        try {
          // Try to get contact list and find the email
          const contacts = await resend.contacts.list();

          if (contacts.error) {
            console.error("Error listing contacts:", contacts.error);
            return json({ ok: false, error: "Could not verify email" }, 500);
          }

          const contactExists = contacts.data?.data?.some(contact =>
            contact.email.toLowerCase() === email.toLowerCase()
          );

          if (contactExists) {
            return json({
              ok: true,
              message: "Email found in waitlist",
              verified: true
            });
          } else {
            return json({ ok: false, error: "Email not found in waitlist" }, 404);
          }
        } catch (verifyError: any) {
          console.error("Email verification error:", verifyError);
          return json({ ok: false, error: "Could not verify email" }, 500);
        }
      }

      // Create contact in Resend
      const contact = await resend.contacts.create({
        email,
        firstName: name || undefined,
      });

      if (contact.error) {
        console.error("Resend contact creation failed:", contact.error);
        return json({ ok: false, error: "Failed to join waitlist" }, 500);
      }

      return json({
        ok: true,
        message: "Successfully joined waitlist"
      });
    } catch (resendError: any) {
      console.error("Resend API error:", resendError);

      // Handle common Resend API errors
      if (resendError.message?.includes('already exists')) {
        return json({
          ok: true,
          message: "Email already in waitlist"
        });
      }

      return json({ ok: false, error: "Failed to join waitlist" }, 500);
    }
  } catch (error: any) {
    console.error("Waitlist signup error:", error);
    return json({ ok: false, error: "Failed to join waitlist" }, 500);
  }
}
