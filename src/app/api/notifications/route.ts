import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/notifications — get user's recent notification history
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    const notifications = await sql`
      SELECT
        id,
        notification_type,
        recipient_email,
        subject,
        related_id,
        related_type,
        status,
        sent_at,
        delivered_at,
        opened_at,
        clicked_at
      FROM notification_history
      WHERE user_id = ${user.userId}
      ORDER BY sent_at DESC
      LIMIT ${limit}
    `;

    return json({ ok: true, data: notifications });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Get notifications error:", error);
    return json({ ok: false, error: "Erro ao obter histórico de notificações" }, 500);
  }
}

// POST /api/notifications — manually trigger a specific notification (admin/testing)
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const body = await req.json();
    const { notification_type, related_id, related_type } = body as {
      notification_type: string;
      related_id?: string;
      related_type?: string;
    };

    if (!notification_type) {
      return json({ ok: false, error: "notification_type é obrigatório" }, 400);
    }

    // Get user email
    const [userInfo] = await sql`
      SELECT email, name FROM customers WHERE id = ${user.userId}
    `;

    if (!userInfo) {
      return json({ ok: false, error: "Utilizador não encontrado" }, 401);
    }

    // Check if user has this notification type enabled
    const [preference] = await sql`
      SELECT enabled, email_enabled
      FROM notification_preferences
      WHERE user_id = ${user.userId} AND notification_type = ${notification_type}
    `;

    if (preference && (!preference.enabled || !preference.email_enabled)) {
      return json({ ok: false, error: "Esta notificação está desativada nas suas preferências" }, 400);
    }

    // Generate notification content based on type
    let subject = "";
    let bodyHtml = "";
    let bodyText = "";

    switch (notification_type) {
      case 'payment_reminder_3_days':
        subject = "Senhorio: Lembrete de Pagamento - 3 dias";
        bodyHtml = generatePaymentReminderEmail(userInfo.name, 3);
        bodyText = "Lembrete: Um pagamento de renda está próximo do vencimento (3 dias).";
        break;

      case 'payment_reminder_1_day':
        subject = "Senhorio: Lembrete de Pagamento - 1 dia";
        bodyHtml = generatePaymentReminderEmail(userInfo.name, 1);
        bodyText = "Lembrete: Um pagamento de renda vence amanhã.";
        break;

      case 'payment_overdue':
        subject = "Senhorio: Pagamento em Atraso";
        bodyHtml = generateOverduePaymentEmail(userInfo.name);
        bodyText = "Aviso: Existem pagamentos de renda em atraso.";
        break;

      case 'monthly_summary':
        subject = "Senhorio: Resumo Mensal dos Seus Imóveis";
        bodyHtml = generateMonthlySummaryEmail(userInfo.name);
        bodyText = "O seu resumo mensal de rendas e pagamentos está disponível.";
        break;

      case 'test_notification':
        subject = "Senhorio: Notificação de Teste";
        bodyHtml = generateTestEmail(userInfo.name);
        bodyText = "Esta é uma notificação de teste do sistema Senhorio.";
        break;

      default:
        return json({ ok: false, error: "Tipo de notificação não suportado" }, 400);
    }

    // Send email using Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return json({ ok: false, error: "Serviço de email não configurado" }, 500);
    }

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);

      const result = await resend.emails.send({
        from: 'Senhorio <notificacoes@senhorio.pt>',
        to: userInfo.email,
        subject,
        html: bodyHtml,
        text: bodyText,
      });

      if (result.error) {
        console.error("Resend email error:", result.error);
        return json({ ok: false, error: "Erro ao enviar email" }, 500);
      }

      // Log the notification
      await sql`
        INSERT INTO notification_history (
          user_id,
          notification_type,
          recipient_email,
          subject,
          related_id,
          related_type,
          resend_message_id,
          status,
          sent_at
        ) VALUES (
          ${user.userId},
          ${notification_type},
          ${userInfo.email},
          ${subject},
          ${related_id || null},
          ${related_type || null},
          ${result.data?.id || null},
          'sent',
          now()
        )
      `;

      return json({
        ok: true,
        message: "Notificação enviada com sucesso",
        messageId: result.data?.id
      });

    } catch (emailError: any) {
      console.error("Email send error:", emailError);
      return json({ ok: false, error: "Erro ao enviar email" }, 500);
    }
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Send notification error:", error);
    return json({ ok: false, error: "Erro ao enviar notificação" }, 500);
  }
}

// Helper functions to generate email content
function generatePaymentReminderEmail(userName: string, daysUntil: number): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Senhorio</h1>
          <p>Lembrete de Pagamento</p>
        </div>
        <div class="content">
          <p>Olá ${userName || 'Senhorio'},</p>
          <p>Este é um lembrete de que tem pagamentos de renda que vencem em <strong>${daysUntil} ${daysUntil === 1 ? 'dia' : 'dias'}</strong>.</p>
          <p>Para ver os detalhes dos pagamentos em falta e gerar recibos:</p>
          <a href="https://senhorio.pt/dashboard" class="button">Ver Dashboard</a>
          <p>Se já recebeu os pagamentos, não se esqueça de gerar os recibos correspondentes na plataforma.</p>
          <p>Obrigado por usar o Senhorio!</p>
        </div>
        <div class="footer">
          <p>Esta é uma notificação automática do Senhorio</p>
          <p>Se não pretende receber estas notificações, pode <a href="https://senhorio.pt/dashboard/settings">alterar as suas preferências</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateOverduePaymentEmail(userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          background-color: #dc2626;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        }
        .alert { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 15px 0; }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Senhorio</h1>
          <p>⚠️ Pagamento em Atraso</p>
        </div>
        <div class="content">
          <p>Olá ${userName || 'Senhorio'},</p>
          <div class="alert">
            <p><strong>Atenção:</strong> Tem pagamentos de renda em atraso.</p>
          </div>
          <p>Sugerimos que contacte os inquilinos em falta para regularizar a situação o quanto antes.</p>
          <p>Para ver os detalhes dos pagamentos em atraso:</p>
          <a href="https://senhorio.pt/dashboard" class="button">Ver Pagamentos em Atraso</a>
          <p>Lembre-se de que pode utilizar a plataforma para acompanhar todos os pagamentos e gerar recibos automáticos.</p>
        </div>
        <div class="footer">
          <p>Esta é uma notificação automática do Senhorio</p>
          <p>Se não pretende receber estas notificações, pode <a href="https://senhorio.pt/dashboard/settings">alterar as suas preferências</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateMonthlySummaryEmail(userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          background-color: #059669;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Senhorio</h1>
          <p>📊 Resumo Mensal</p>
        </div>
        <div class="content">
          <p>Olá ${userName || 'Senhorio'},</p>
          <p>O seu resumo mensal está disponível! Veja como os seus imóveis estão a performar:</p>
          <ul>
            <li>Pagamentos recebidos este mês</li>
            <li>Recibos gerados e pendentes</li>
            <li>Despesas registadas</li>
            <li>Resumo fiscal atualizado</li>
          </ul>
          <a href="https://senhorio.pt/dashboard" class="button">Ver Resumo Completo</a>
          <p>Continue a acompanhar a sua carteira de imóveis no Senhorio!</p>
        </div>
        <div class="footer">
          <p>Esta é uma notificação automática do Senhorio</p>
          <p>Se não pretende receber estas notificações, pode <a href="https://senhorio.pt/dashboard/settings">alterar as suas preferências</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateTestEmail(userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #6366f1; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          background-color: #6366f1;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Senhorio</h1>
          <p>🧪 Notificação de Teste</p>
        </div>
        <div class="content">
          <p>Olá ${userName || 'Senhorio'},</p>
          <p>Esta é uma notificação de teste para verificar se o sistema de emails está a funcionar corretamente.</p>
          <p>Se recebeu este email, significa que as suas notificações estão configuradas corretamente!</p>
          <a href="https://senhorio.pt/dashboard/settings" class="button">Configurar Notificações</a>
          <p>Pode gerir todas as suas preferências de notificação no painel de configurações.</p>
        </div>
        <div class="footer">
          <p>Esta é uma notificação de teste do Senhorio</p>
          <p>Se não pretende receber estas notificações, pode <a href="https://senhorio.pt/dashboard/settings">alterar as suas preferências</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}