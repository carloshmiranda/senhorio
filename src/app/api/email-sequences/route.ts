import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { initializeEmailSequences } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    const sql = getDb();
    const url = new URL(req.url);
    const sequence = url.searchParams.get("sequence");

    let query;
    if (sequence) {
      query = sql`
        SELECT id, sequence, step, subject, body_html, body_text, delay_hours,
               variant, is_active, send_count, open_count, click_count,
               created_at, updated_at
        FROM email_sequences
        WHERE sequence = ${sequence}
        ORDER BY step ASC
      `;
    } else {
      query = sql`
        SELECT id, sequence, step, subject, delay_hours, variant, is_active,
               send_count, open_count, click_count, created_at, updated_at
        FROM email_sequences
        ORDER BY sequence, step ASC
      `;
    }

    const sequences = await query;

    return NextResponse.json({
      ok: true,
      data: sequences
    });
  } catch (error: any) {
    console.error("Email sequences GET error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "initialize") {
      const result = await initializeEmailSequences();

      if (result.success) {
        return NextResponse.json({
          ok: true,
          message: result.message
        });
      } else {
        return NextResponse.json({
          ok: false,
          error: result.error
        }, { status: 500 });
      }
    }

    // For creating new sequences
    const { sequence, step, subject, body_html, body_text, delay_hours, variant = 'a' } = body;

    if (!sequence || !step || !subject || !body_html) {
      return NextResponse.json({
        ok: false,
        error: "Missing required fields: sequence, step, subject, body_html"
      }, { status: 400 });
    }

    const sql = getDb();

    const [newSequence] = await sql`
      INSERT INTO email_sequences (sequence, step, subject, body_html, body_text, delay_hours, variant)
      VALUES (${sequence}, ${step}, ${subject}, ${body_html}, ${body_text || null}, ${delay_hours || 0}, ${variant})
      RETURNING id, sequence, step, subject, created_at
    `;

    return NextResponse.json({
      ok: true,
      data: newSequence
    });
  } catch (error: any) {
    console.error("Email sequences POST error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, subject, body_html, body_text, delay_hours, is_active } = body;

    if (!id) {
      return NextResponse.json({
        ok: false,
        error: "Missing sequence ID"
      }, { status: 400 });
    }

    const sql = getDb();

    const [updated] = await sql`
      UPDATE email_sequences
      SET
        subject = COALESCE(${subject}, subject),
        body_html = COALESCE(${body_html}, body_html),
        body_text = COALESCE(${body_text}, body_text),
        delay_hours = COALESCE(${delay_hours}, delay_hours),
        is_active = COALESCE(${is_active}, is_active),
        updated_at = now()
      WHERE id = ${id}
      RETURNING id, sequence, step, subject, updated_at
    `;

    if (!updated) {
      return NextResponse.json({
        ok: false,
        error: "Email sequence not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      data: updated
    });
  } catch (error: any) {
    console.error("Email sequences PUT error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        ok: false,
        error: "Missing sequence ID"
      }, { status: 400 });
    }

    const sql = getDb();

    const [deleted] = await sql`
      DELETE FROM email_sequences
      WHERE id = ${id}
      RETURNING id, sequence, step
    `;

    if (!deleted) {
      return NextResponse.json({
        ok: false,
        error: "Email sequence not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      message: "Email sequence deleted"
    });
  } catch (error: any) {
    console.error("Email sequences DELETE error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}