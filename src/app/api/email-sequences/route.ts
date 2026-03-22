import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/email-sequences — list email sequences
export async function GET(req: NextRequest) {
  try {
    const sql = getDb();
    const url = req.nextUrl;
    const sequence = url.searchParams.get('sequence');
    const variant = url.searchParams.get('variant');
    const active = url.searchParams.get('active');

    let sequences;

    // Build query based on filters
    if (sequence && variant && active !== null) {
      sequences = await sql`
        SELECT * FROM email_sequences
        WHERE sequence = ${sequence}
        AND variant = ${variant}
        AND is_active = ${active === 'true'}
        ORDER BY sequence, step, variant
      `;
    } else if (sequence && variant) {
      sequences = await sql`
        SELECT * FROM email_sequences
        WHERE sequence = ${sequence} AND variant = ${variant}
        ORDER BY sequence, step, variant
      `;
    } else if (sequence && active !== null) {
      sequences = await sql`
        SELECT * FROM email_sequences
        WHERE sequence = ${sequence} AND is_active = ${active === 'true'}
        ORDER BY sequence, step, variant
      `;
    } else if (variant && active !== null) {
      sequences = await sql`
        SELECT * FROM email_sequences
        WHERE variant = ${variant} AND is_active = ${active === 'true'}
        ORDER BY sequence, step, variant
      `;
    } else if (sequence) {
      sequences = await sql`
        SELECT * FROM email_sequences
        WHERE sequence = ${sequence}
        ORDER BY sequence, step, variant
      `;
    } else if (variant) {
      sequences = await sql`
        SELECT * FROM email_sequences
        WHERE variant = ${variant}
        ORDER BY sequence, step, variant
      `;
    } else if (active !== null) {
      sequences = await sql`
        SELECT * FROM email_sequences
        WHERE is_active = ${active === 'true'}
        ORDER BY sequence, step, variant
      `;
    } else {
      sequences = await sql`
        SELECT * FROM email_sequences
        ORDER BY sequence, step, variant
      `;
    }

    return json({
      ok: true,
      sequences: sequences.map((seq: any) => ({
        id: seq.id,
        sequence: seq.sequence,
        step: seq.step,
        subject: seq.subject,
        body_html: seq.body_html,
        body_text: seq.body_text,
        delay_hours: seq.delay_hours,
        variant: seq.variant,
        is_active: seq.is_active,
        send_count: seq.send_count,
        open_count: seq.open_count,
        click_count: seq.click_count,
        created_at: seq.created_at,
        updated_at: seq.updated_at
      }))
    });

  } catch (error: any) {
    console.error("Email sequences fetch error:", error);
    return json({ ok: false, error: "Failed to fetch email sequences" }, 500);
  }
}

// POST /api/email-sequences — create new email sequence
export async function POST(req: NextRequest) {
  try {
    const sql = getDb();
    const body = await req.json();

    const {
      sequence,
      step,
      subject,
      body_html,
      body_text,
      delay_hours = 0,
      variant = 'a',
      is_active = true
    } = body;

    // Validate required fields
    if (!sequence || !step || !subject || !body_html) {
      return json({
        ok: false,
        error: "Missing required fields: sequence, step, subject, body_html"
      }, 400);
    }

    // Check if sequence already exists
    const [existing] = await sql`
      SELECT id FROM email_sequences
      WHERE sequence = ${sequence} AND step = ${step} AND variant = ${variant}
    `;

    if (existing) {
      return json({
        ok: false,
        error: `Email sequence ${sequence} step ${step} variant ${variant} already exists`
      }, 409);
    }

    // Create new sequence
    const [created] = await sql`
      INSERT INTO email_sequences (
        sequence, step, subject, body_html, body_text,
        delay_hours, variant, is_active
      ) VALUES (
        ${sequence}, ${step}, ${subject}, ${body_html}, ${body_text},
        ${delay_hours}, ${variant}, ${is_active}
      ) RETURNING *
    `;

    return json({
      ok: true,
      sequence: {
        id: created.id,
        sequence: created.sequence,
        step: created.step,
        subject: created.subject,
        body_html: created.body_html,
        body_text: created.body_text,
        delay_hours: created.delay_hours,
        variant: created.variant,
        is_active: created.is_active,
        send_count: created.send_count,
        open_count: created.open_count,
        click_count: created.click_count,
        created_at: created.created_at,
        updated_at: created.updated_at
      }
    }, 201);

  } catch (error: any) {
    console.error("Email sequence creation error:", error);
    return json({ ok: false, error: "Failed to create email sequence" }, 500);
  }
}

// PUT /api/email-sequences?id=123 — update email sequence
export async function PUT(req: NextRequest) {
  try {
    const sql = getDb();
    const url = req.nextUrl;
    const id = url.searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return json({ ok: false, error: "Missing id parameter" }, 400);
    }

    // Check if sequence exists
    const [existing] = await sql`
      SELECT id FROM email_sequences WHERE id = ${id}
    `;

    if (!existing) {
      return json({ ok: false, error: "Email sequence not found" }, 404);
    }

    const {
      subject,
      body_html,
      body_text,
      delay_hours,
      is_active
    } = body;

    // Update sequence
    const [updated] = await sql`
      UPDATE email_sequences SET
        subject = COALESCE(${subject}, subject),
        body_html = COALESCE(${body_html}, body_html),
        body_text = COALESCE(${body_text}, body_text),
        delay_hours = COALESCE(${delay_hours}, delay_hours),
        is_active = COALESCE(${is_active}, is_active),
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;

    return json({
      ok: true,
      sequence: {
        id: updated.id,
        sequence: updated.sequence,
        step: updated.step,
        subject: updated.subject,
        body_html: updated.body_html,
        body_text: updated.body_text,
        delay_hours: updated.delay_hours,
        variant: updated.variant,
        is_active: updated.is_active,
        send_count: updated.send_count,
        open_count: updated.open_count,
        click_count: updated.click_count,
        created_at: updated.created_at,
        updated_at: updated.updated_at
      }
    });

  } catch (error: any) {
    console.error("Email sequence update error:", error);
    return json({ ok: false, error: "Failed to update email sequence" }, 500);
  }
}

// DELETE /api/email-sequences?id=123 — delete email sequence
export async function DELETE(req: NextRequest) {
  try {
    const sql = getDb();
    const url = req.nextUrl;
    const id = url.searchParams.get('id');

    if (!id) {
      return json({ ok: false, error: "Missing id parameter" }, 400);
    }

    // Check if sequence exists
    const [existing] = await sql`
      SELECT id, sequence, step, variant FROM email_sequences WHERE id = ${id}
    `;

    if (!existing) {
      return json({ ok: false, error: "Email sequence not found" }, 404);
    }

    // Delete sequence
    await sql`DELETE FROM email_sequences WHERE id = ${id}`;

    return json({
      ok: true,
      message: `Email sequence ${existing.sequence} step ${existing.step} variant ${existing.variant} deleted`
    });

  } catch (error: any) {
    console.error("Email sequence deletion error:", error);
    return json({ ok: false, error: "Failed to delete email sequence" }, 500);
  }
}