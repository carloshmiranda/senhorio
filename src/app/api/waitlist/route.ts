import { NextRequest, NextResponse } from "next/server";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

const AUDIENCE_NAME = "Senhorio Waitlist";

// POST /api/waitlist — join the waitlist or verify email
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, verify_only, source } = body as {
      email?: string;
      name?: string;
      verify_only?: boolean;
      source?: string;
    };

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

      // Get or create the waitlist audience
      let audienceId: string;

      try {
        // First, try to find existing audience
        const audiences = await resend.audiences.list();
        const existingAudience = audiences.data?.data?.find(
          (audience) => audience.name === AUDIENCE_NAME
        );

        if (existingAudience) {
          audienceId = existingAudience.id;
        } else {
          // Create new audience if it doesn't exist
          const newAudience = await resend.audiences.create({
            name: AUDIENCE_NAME,
          });

          if (newAudience.error) {
            console.error("Failed to create audience:", newAudience.error);
            return json({ ok: false, error: "Failed to setup waitlist" }, 500);
          }

          audienceId = newAudience.data!.id;
        }
      } catch (audienceError: any) {
        console.error("Error managing audience:", audienceError);
        return json({ ok: false, error: "Failed to setup waitlist" }, 500);
      }

      if (verify_only) {
        // Verify if email exists in the waitlist audience
        try {
          const contacts = await resend.contacts.list({ audienceId });

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

      // Add contact to the waitlist audience
      const contact = await resend.contacts.create({
        email,
        firstName: name || undefined,
        audienceId,
      });

      if (contact.error) {
        console.error("Resend contact creation failed:", contact.error);

        // Handle duplicate email case
        if (contact.error.message?.includes('Contact already exists')) {
          return json({
            ok: true,
            message: "Email already in waitlist"
          });
        }

        return json({ ok: false, error: "Failed to join waitlist" }, 500);
      }

      console.log(`Added contact to waitlist: ${email}${source ? ` (source: ${source})` : ''}`);

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
