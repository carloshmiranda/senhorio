import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/notifications/preferences — get user notification preferences
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();

    // Get user's current notification preferences
    const preferences = await sql`
      SELECT
        notification_type,
        enabled,
        email_enabled,
        days_before,
        time_of_day,
        created_at,
        updated_at
      FROM notification_preferences
      WHERE user_id = ${user.userId}
      ORDER BY notification_type
    `;

    // Define default preferences for all notification types
    const defaultPreferences = [
      {
        notification_type: 'payment_reminder_3_days',
        enabled: true,
        email_enabled: true,
        days_before: 3,
        time_of_day: '09:00:00'
      },
      {
        notification_type: 'payment_reminder_1_day',
        enabled: true,
        email_enabled: true,
        days_before: 1,
        time_of_day: '09:00:00'
      },
      {
        notification_type: 'payment_overdue',
        enabled: true,
        email_enabled: true,
        days_before: null,
        time_of_day: '10:00:00'
      },
      {
        notification_type: 'monthly_summary',
        enabled: true,
        email_enabled: true,
        days_before: null,
        time_of_day: '08:00:00'
      },
      {
        notification_type: 'tax_deadline_reminder',
        enabled: true,
        email_enabled: true,
        days_before: 7,
        time_of_day: '09:00:00'
      },
      {
        notification_type: 'receipt_generation_reminder',
        enabled: true,
        email_enabled: true,
        days_before: 3,
        time_of_day: '09:00:00'
      }
    ];

    // Merge with defaults for any missing preferences
    const preferenceMap = preferences.reduce((acc, pref) => {
      acc[pref.notification_type] = pref;
      return acc;
    }, {} as Record<string, any>);

    const allPreferences = defaultPreferences.map(defaultPref => {
      const userPref = preferenceMap[defaultPref.notification_type];
      return userPref || {
        ...defaultPref,
        created_at: null,
        updated_at: null
      };
    });

    return json({ ok: true, data: allPreferences });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Get notification preferences error:", error);
    return json({ ok: false, error: "Erro ao obter preferências de notificação" }, 500);
  }
}

// PUT /api/notifications/preferences — update user notification preferences
export async function PUT(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();
    const { preferences } = body as { preferences: any[] };

    if (!preferences || !Array.isArray(preferences)) {
      return json({ ok: false, error: "Preferências são obrigatórias" }, 400);
    }

    const validTypes = [
      'payment_reminder_3_days',
      'payment_reminder_1_day',
      'payment_overdue',
      'monthly_summary',
      'tax_deadline_reminder',
      'receipt_generation_reminder'
    ];

    // Validate each preference
    for (const pref of preferences) {
      if (!validTypes.includes(pref.notification_type)) {
        return json({ ok: false, error: `Tipo de notificação inválido: ${pref.notification_type}` }, 400);
      }
      if (typeof pref.enabled !== 'boolean' || typeof pref.email_enabled !== 'boolean') {
        return json({ ok: false, error: "Valores enabled/email_enabled devem ser booleanos" }, 400);
      }
    }

    // Update each preference using upsert
    for (const pref of preferences) {
      await sql`
        INSERT INTO notification_preferences (
          user_id,
          notification_type,
          enabled,
          email_enabled,
          days_before,
          time_of_day,
          updated_at
        ) VALUES (
          ${user.userId},
          ${pref.notification_type},
          ${pref.enabled},
          ${pref.email_enabled},
          ${pref.days_before},
          ${pref.time_of_day || '09:00:00'},
          now()
        )
        ON CONFLICT (user_id, notification_type)
        DO UPDATE SET
          enabled = EXCLUDED.enabled,
          email_enabled = EXCLUDED.email_enabled,
          days_before = EXCLUDED.days_before,
          time_of_day = EXCLUDED.time_of_day,
          updated_at = now()
      `;
    }

    return json({ ok: true, message: "Preferências de notificação atualizadas com sucesso" });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Update notification preferences error:", error);
    return json({ ok: false, error: "Erro ao atualizar preferências de notificação" }, 500);
  }
}