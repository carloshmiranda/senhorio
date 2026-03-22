import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendWaitlistWelcomeEmail } from "@/lib/email";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// POST /api/waitlist — join the waitlist
export async function POST(req: NextRequest) {
  try {
    const sql = getDb();
    const body = await req.json();
    const { email, name, ref } = body as { email?: string; name?: string; ref?: string };

    if (!email || !email.includes("@")) {
      return json({ ok: false, error: "Valid email is required" }, 400);
    }

    // Check for existing signup
    const [existing] = await sql`SELECT id, referral_code, position FROM waitlist WHERE email = ${email}`;
    if (existing) {
      return json({
        ok: true,
        already_signed_up: true,
        referral_code: existing.referral_code,
        position: existing.position,
      });
    }

    // Generate a short referral code
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Get next position
    const [{ count }] = await sql`SELECT COUNT(*) as count FROM waitlist`;
    const position = Number(count) + 1;

    // Extract UTM params from referrer or body
    const utmSource = body.utm_source || null;
    const utmMedium = body.utm_medium || null;
    const utmCampaign = body.utm_campaign || null;

    // Determine source
    let source = "organic";
    let referredBy = null;
    if (ref) {
      const [referrer] = await sql`SELECT id FROM waitlist WHERE referral_code = ${ref}`;
      if (referrer) {
        referredBy = referrer.id;
        source = "referral";
        // Increment referrer's count
        await sql`UPDATE waitlist SET referral_count = referral_count + 1 WHERE id = ${referrer.id}`;
      }
    }

    const [entry] = await sql`
      INSERT INTO waitlist (email, name, referral_code, referred_by, position, source, utm_source, utm_medium, utm_campaign)
      VALUES (${email}, ${name || null}, ${referralCode}, ${referredBy}, ${position}, ${source}, ${utmSource}, ${utmMedium}, ${utmCampaign})
      RETURNING id, referral_code, position
    `;

    // Send welcome email using email library
    try {
      const emailResult = await sendWaitlistWelcomeEmail(email, name);
      if (!emailResult.success) {
        console.warn("Welcome email failed (non-blocking):", emailResult.error);
      }
    } catch (e) {
      console.error("Welcome email failed (non-blocking):", e);
    }

    return json({
      ok: true,
      referral_code: entry.referral_code,
      position: entry.position,
    });
  } catch (error: any) {
    console.error("Waitlist signup error:", error);
    return json({ ok: false, error: "Failed to join waitlist" }, 500);
  }
}

// GET /api/waitlist?email=... — check position
export async function GET(req: NextRequest) {
  const sql = getDb();
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return json({ ok: false, error: "email param required" }, 400);

  const [entry] = await sql`
    SELECT position, referral_code, referral_count, status, created_at
    FROM waitlist WHERE email = ${email}
  `;
  if (!entry) return json({ ok: false, error: "Not found" }, 404);

  const [{ count }] = await sql`SELECT COUNT(*) as count FROM waitlist WHERE status = 'waiting'`;

  return json({
    ok: true,
    position: entry.position,
    referral_code: entry.referral_code,
    referral_count: entry.referral_count,
    total_waiting: Number(count),
    status: entry.status,
  });
}
