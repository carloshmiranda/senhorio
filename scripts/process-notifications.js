#!/usr/bin/env node
/**
 * Background job to process payment notifications
 * Run this script periodically (e.g., via cron) to:
 * 1. Check for upcoming rental payment due dates
 * 2. Send payment reminders (3 days, 1 day before due)
 * 3. Send overdue payment alerts
 * 4. Send monthly summaries
 *
 * Usage:
 *   node scripts/process-notifications.js [--dry-run] [--type=<notification_type>]
 */

const { neon } = require('@neondatabase/serverless');
const { Resend } = require('resend');

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const SPECIFIC_TYPE = process.argv.find(arg => arg.startsWith('--type='))?.split('=')[1];
const DATABASE_URL = process.env.DATABASE_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is required');
  process.exit(1);
}

if (!RESEND_API_KEY && !DRY_RUN) {
  console.error('ERROR: RESEND_API_KEY environment variable is required (unless --dry-run)');
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

async function main() {
  console.log('🔄 Starting notification processing...');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  if (SPECIFIC_TYPE) {
    console.log(`Type filter: ${SPECIFIC_TYPE}`);
  }
  console.log('');

  try {
    if (!SPECIFIC_TYPE || SPECIFIC_TYPE === 'payment_reminder_3_days') {
      await processPaymentReminders(3, 'payment_reminder_3_days');
    }

    if (!SPECIFIC_TYPE || SPECIFIC_TYPE === 'payment_reminder_1_day') {
      await processPaymentReminders(1, 'payment_reminder_1_day');
    }

    if (!SPECIFIC_TYPE || SPECIFIC_TYPE === 'payment_overdue') {
      await processOverduePayments();
    }

    if (!SPECIFIC_TYPE || SPECIFIC_TYPE === 'monthly_summary') {
      await processMonthlySummaries();
    }

    if (!SPECIFIC_TYPE || SPECIFIC_TYPE === 'tax_deadline_reminder') {
      await processTaxDeadlineReminders();
    }

    if (!SPECIFIC_TYPE || SPECIFIC_TYPE === 'receipt_generation_reminder') {
      await processReceiptGenerationReminders();
    }

    console.log('✅ Notification processing completed successfully');
  } catch (error) {
    console.error('❌ Error during notification processing:', error);
    process.exit(1);
  }
}

async function processPaymentReminders(daysUntilDue, notificationType) {
  console.log(`📅 Processing ${notificationType}...`);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysUntilDue);
  const dateStr = targetDate.toISOString().split('T')[0];

  try {
    // Get rental payments due in X days that haven't been paid
    const upcomingPayments = await sql`
      SELECT DISTINCT
        rp.id as payment_id,
        rp.due_date,
        rp.amount,
        t.name as tenant_name,
        p.address as property_address,
        c.id as owner_id,
        c.email as owner_email,
        c.name as owner_name
      FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      JOIN customers c ON c.id = p.owner_id
      WHERE rp.due_date = ${dateStr}
        AND rp.status IN ('pending')
        AND c.status = 'active'
        AND t.status = 'active'
        AND p.status = 'active'
    `;

    if (upcomingPayments.length === 0) {
      console.log(`   No payments found due in ${daysUntilDue} days`);
      return;
    }

    console.log(`   Found ${upcomingPayments.length} payments due in ${daysUntilDue} days`);

    for (const payment of upcomingPayments) {
      await processPaymentNotification(payment, notificationType, daysUntilDue);
    }
  } catch (error) {
    console.error(`Error processing ${notificationType}:`, error);
  }
}

async function processOverduePayments() {
  console.log('⚠️ Processing overdue payments...');

  const today = new Date().toISOString().split('T')[0];

  try {
    const overduePayments = await sql`
      SELECT DISTINCT
        c.id as owner_id,
        c.email as owner_email,
        c.name as owner_name,
        COUNT(rp.id) as overdue_count,
        SUM(rp.amount) as overdue_amount
      FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      JOIN customers c ON c.id = p.owner_id
      WHERE rp.due_date < ${today}
        AND rp.status IN ('pending', 'overdue')
        AND c.status = 'active'
        AND t.status = 'active'
        AND p.status = 'active'
      GROUP BY c.id, c.email, c.name
      HAVING COUNT(rp.id) > 0
    `;

    if (overduePayments.length === 0) {
      console.log('   No overdue payments found');
      return;
    }

    console.log(`   Found ${overduePayments.length} users with overdue payments`);

    for (const owner of overduePayments) {
      await processOverdueNotification(owner);
    }
  } catch (error) {
    console.error('Error processing overdue payments:', error);
  }
}

async function processMonthlySummaries() {
  console.log('📊 Processing monthly summaries...');

  // Only send monthly summaries on the 1st of each month
  const today = new Date();
  if (today.getDate() !== 1 && !SPECIFIC_TYPE) {
    console.log('   Not the 1st of the month, skipping monthly summaries');
    return;
  }

  try {
    const activeOwners = await sql`
      SELECT DISTINCT
        c.id as owner_id,
        c.email as owner_email,
        c.name as owner_name
      FROM customers c
      JOIN properties p ON p.owner_id = c.id
      WHERE c.status = 'active'
        AND p.status = 'active'
    `;

    console.log(`   Found ${activeOwners.length} active property owners`);

    for (const owner of activeOwners) {
      await processMonthlySummaryNotification(owner);
    }
  } catch (error) {
    console.error('Error processing monthly summaries:', error);
  }
}

async function processPaymentNotification(payment, notificationType, daysUntil) {
  try {
    // Check if user has this notification enabled
    const preference = await checkNotificationPreference(payment.owner_id, notificationType);
    if (!preference.enabled || !preference.email_enabled) {
      console.log(`   Skipping ${payment.owner_email} - notification disabled`);
      return;
    }

    // Check if we already sent this notification
    const existingNotification = await sql`
      SELECT id FROM notification_history
      WHERE user_id = ${payment.owner_id}
        AND notification_type = ${notificationType}
        AND related_id = ${payment.payment_id}
        AND related_type = 'payment'
        AND sent_at > now() - interval '24 hours'
    `;

    if (existingNotification.length > 0) {
      console.log(`   Skipping ${payment.owner_email} - notification already sent today`);
      return;
    }

    const subject = `Senhorio: Lembrete de Pagamento - ${daysUntil} ${daysUntil === 1 ? 'dia' : 'dias'}`;
    const bodyHtml = generatePaymentReminderEmail(
      payment.owner_name,
      daysUntil,
      payment.tenant_name,
      payment.property_address,
      payment.amount,
      payment.due_date
    );

    if (DRY_RUN) {
      console.log(`   [DRY RUN] Would send to ${payment.owner_email}: ${subject}`);
      return;
    }

    // Send email
    const result = await resend.emails.send({
      from: 'Senhorio <notificacoes@senhorio.pt>',
      to: payment.owner_email,
      subject,
      html: bodyHtml,
    });

    if (result.error) {
      console.error(`   Error sending to ${payment.owner_email}:`, result.error);
      return;
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
        status
      ) VALUES (
        ${payment.owner_id},
        ${notificationType},
        ${payment.owner_email},
        ${subject},
        ${payment.payment_id},
        'payment',
        ${result.data?.id},
        'sent'
      )
    `;

    console.log(`   ✅ Sent to ${payment.owner_email}`);
  } catch (error) {
    console.error(`   Error processing notification for ${payment.owner_email}:`, error);
  }
}

async function processOverdueNotification(owner) {
  try {
    const preference = await checkNotificationPreference(owner.owner_id, 'payment_overdue');
    if (!preference.enabled || !preference.email_enabled) {
      console.log(`   Skipping ${owner.owner_email} - notification disabled`);
      return;
    }

    // Check if we already sent an overdue notification today
    const existingNotification = await sql`
      SELECT id FROM notification_history
      WHERE user_id = ${owner.owner_id}
        AND notification_type = 'payment_overdue'
        AND sent_at > now() - interval '24 hours'
    `;

    if (existingNotification.length > 0) {
      console.log(`   Skipping ${owner.owner_email} - notification already sent today`);
      return;
    }

    const subject = `Senhorio: ${owner.overdue_count} Pagamento${owner.overdue_count > 1 ? 's' : ''} em Atraso`;
    const bodyHtml = generateOverduePaymentEmail(
      owner.owner_name,
      owner.overdue_count,
      owner.overdue_amount
    );

    if (DRY_RUN) {
      console.log(`   [DRY RUN] Would send to ${owner.owner_email}: ${subject}`);
      return;
    }

    const result = await resend.emails.send({
      from: 'Senhorio <notificacoes@senhorio.pt>',
      to: owner.owner_email,
      subject,
      html: bodyHtml,
    });

    if (result.error) {
      console.error(`   Error sending to ${owner.owner_email}:`, result.error);
      return;
    }

    await sql`
      INSERT INTO notification_history (
        user_id,
        notification_type,
        recipient_email,
        subject,
        resend_message_id,
        status
      ) VALUES (
        ${owner.owner_id},
        'payment_overdue',
        ${owner.owner_email},
        ${subject},
        ${result.data?.id},
        'sent'
      )
    `;

    console.log(`   ✅ Sent to ${owner.owner_email}`);
  } catch (error) {
    console.error(`   Error processing overdue notification for ${owner.owner_email}:`, error);
  }
}

async function processMonthlySummaryNotification(owner) {
  try {
    const preference = await checkNotificationPreference(owner.owner_id, 'monthly_summary');
    if (!preference.enabled || !preference.email_enabled) {
      console.log(`   Skipping ${owner.owner_email} - notification disabled`);
      return;
    }

    // Check if we already sent a monthly summary this month
    const existingNotification = await sql`
      SELECT id FROM notification_history
      WHERE user_id = ${owner.owner_id}
        AND notification_type = 'monthly_summary'
        AND sent_at > date_trunc('month', now())
    `;

    if (existingNotification.length > 0) {
      console.log(`   Skipping ${owner.owner_email} - monthly summary already sent`);
      return;
    }

    const subject = `Senhorio: Resumo Mensal dos Seus Imóveis`;
    const bodyHtml = generateMonthlySummaryEmail(owner.owner_name);

    if (DRY_RUN) {
      console.log(`   [DRY RUN] Would send to ${owner.owner_email}: ${subject}`);
      return;
    }

    const result = await resend.emails.send({
      from: 'Senhorio <notificacoes@senhorio.pt>',
      to: owner.owner_email,
      subject,
      html: bodyHtml,
    });

    if (result.error) {
      console.error(`   Error sending to ${owner.owner_email}:`, result.error);
      return;
    }

    await sql`
      INSERT INTO notification_history (
        user_id,
        notification_type,
        recipient_email,
        subject,
        resend_message_id,
        status
      ) VALUES (
        ${owner.owner_id},
        'monthly_summary',
        ${owner.owner_email},
        ${subject},
        ${result.data?.id},
        'sent'
      )
    `;

    console.log(`   ✅ Sent to ${owner.owner_email}`);
  } catch (error) {
    console.error(`   Error processing monthly summary for ${owner.owner_email}:`, error);
  }
}

async function checkNotificationPreference(userId, notificationType) {
  const [preference] = await sql`
    SELECT enabled, email_enabled
    FROM notification_preferences
    WHERE user_id = ${userId} AND notification_type = ${notificationType}
  `;

  // Default to enabled if no preference is set
  return preference || { enabled: true, email_enabled: true };
}

function generatePaymentReminderEmail(userName, daysUntil, tenantName, propertyAddress, amount, dueDate) {
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
        .payment-details { background-color: #f3f4f6; padding: 15px; margin: 15px 0; border-radius: 5px; }
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
          <p>Este é um lembrete de que tem um pagamento de renda que vence em <strong>${daysUntil} ${daysUntil === 1 ? 'dia' : 'dias'}</strong>:</p>

          <div class="payment-details">
            <h3>Detalhes do Pagamento</h3>
            <p><strong>Inquilino:</strong> ${tenantName}</p>
            <p><strong>Imóvel:</strong> ${propertyAddress}</p>
            <p><strong>Valor:</strong> €${amount}</p>
            <p><strong>Data de Vencimento:</strong> ${new Date(dueDate).toLocaleDateString('pt-PT')}</p>
          </div>

          <p>Para acompanhar este pagamento e gerar recibos:</p>
          <a href="https://senhorio.pt/dashboard" class="button">Ver Dashboard</a>

          <p>Se já recebeu este pagamento, não se esqueça de gerar o recibo correspondente na plataforma.</p>
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

function generateOverduePaymentEmail(userName, overdueCount, overdueAmount) {
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
        .alert { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 15px 0; }
        .button {
          display: inline-block;
          background-color: #dc2626;
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
          <p>⚠️ Pagamento${overdueCount > 1 ? 's' : ''} em Atraso</p>
        </div>
        <div class="content">
          <p>Olá ${userName || 'Senhorio'},</p>

          <div class="alert">
            <p><strong>Atenção:</strong> Tem <strong>${overdueCount} pagamento${overdueCount > 1 ? 's' : ''}</strong> de renda em atraso, no valor total de <strong>€${overdueAmount}</strong>.</p>
          </div>

          <p>Sugerimos que contacte ${overdueCount === 1 ? 'o inquilino em falta' : 'os inquilinos em falta'} para regularizar a situação o quanto antes.</p>

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

function generateMonthlySummaryEmail(userName) {
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

async function processTaxDeadlineReminders() {
  console.log('📋 Processing tax deadline reminders...');

  const today = new Date();
  const currentMonth = today.getMonth() + 1; // 1-based month
  const currentDate = today.getDate();

  // Tax deadlines in Portugal:
  // - IRS Declaration: March 31 (or May 31 if filed online)
  // - Quarterly payments: July 20, September 20, December 20
  // Send reminders 7 days before these dates
  const shouldSendReminder =
    // IRS deadline reminders (March 24 and May 24)
    (currentMonth === 3 && currentDate === 24) ||
    (currentMonth === 5 && currentDate === 24) ||
    // Quarterly payment reminders (July 13, September 13, December 13)
    (currentMonth === 7 && currentDate === 13) ||
    (currentMonth === 9 && currentDate === 13) ||
    (currentMonth === 12 && currentDate === 13);

  if (!shouldSendReminder && !SPECIFIC_TYPE) {
    console.log('   Not a tax deadline reminder date, skipping');
    return;
  }

  try {
    const activeOwners = await sql`
      SELECT DISTINCT
        c.id as owner_id,
        c.email as owner_email,
        c.name as owner_name
      FROM customers c
      JOIN properties p ON p.owner_id = c.id
      WHERE c.status = 'active'
        AND p.status = 'active'
    `;

    console.log(`   Found ${activeOwners.length} active property owners`);

    for (const owner of activeOwners) {
      await processTaxDeadlineNotification(owner);
    }
  } catch (error) {
    console.error('Error processing tax deadline reminders:', error);
  }
}

async function processReceiptGenerationReminders() {
  console.log('📄 Processing receipt generation reminders...');

  // Send receipt reminders on the 5th of each month
  const today = new Date();
  if (today.getDate() !== 5 && !SPECIFIC_TYPE) {
    console.log('   Not the 5th of the month, skipping receipt reminders');
    return;
  }

  try {
    // Find owners who have paid rental payments but no corresponding receipts
    const ownersWithPendingReceipts = await sql`
      SELECT DISTINCT
        c.id as owner_id,
        c.email as owner_email,
        c.name as owner_name,
        COUNT(rp.id) as paid_payments_count
      FROM customers c
      JOIN properties p ON p.owner_id = c.id
      JOIN tenants t ON t.property_id = p.id
      JOIN rental_payments rp ON rp.tenant_id = t.id
      LEFT JOIN receipts r ON r.payment_id = rp.id
      WHERE c.status = 'active'
        AND p.status = 'active'
        AND t.status = 'active'
        AND rp.status = 'paid'
        AND r.id IS NULL
        AND rp.paid_date >= date_trunc('month', now()) - interval '2 months'
      GROUP BY c.id, c.email, c.name
      HAVING COUNT(rp.id) > 0
    `;

    if (ownersWithPendingReceipts.length === 0) {
      console.log('   No owners with pending receipts found');
      return;
    }

    console.log(`   Found ${ownersWithPendingReceipts.length} owners with pending receipts`);

    for (const owner of ownersWithPendingReceipts) {
      await processReceiptGenerationNotification(owner);
    }
  } catch (error) {
    console.error('Error processing receipt generation reminders:', error);
  }
}

async function processTaxDeadlineNotification(owner) {
  try {
    const preference = await checkNotificationPreference(owner.owner_id, 'tax_deadline_reminder');
    if (!preference.enabled || !preference.email_enabled) {
      console.log(`   Skipping ${owner.owner_email} - notification disabled`);
      return;
    }

    // Check if we already sent a tax deadline reminder this month
    const existingNotification = await sql`
      SELECT id FROM notification_history
      WHERE user_id = ${owner.owner_id}
        AND notification_type = 'tax_deadline_reminder'
        AND sent_at > date_trunc('month', now())
    `;

    if (existingNotification.length > 0) {
      console.log(`   Skipping ${owner.owner_email} - reminder already sent this month`);
      return;
    }

    const subject = `Senhorio: Lembrete de Obrigações Fiscais`;
    const bodyHtml = generateTaxDeadlineReminderEmail(owner.owner_name);

    if (DRY_RUN) {
      console.log(`   [DRY RUN] Would send to ${owner.owner_email}: ${subject}`);
      return;
    }

    const result = await resend.emails.send({
      from: 'Senhorio <notificacoes@senhorio.pt>',
      to: owner.owner_email,
      subject,
      html: bodyHtml,
    });

    if (result.error) {
      console.error(`   Error sending to ${owner.owner_email}:`, result.error);
      return;
    }

    await sql`
      INSERT INTO notification_history (
        user_id,
        notification_type,
        recipient_email,
        subject,
        resend_message_id,
        status
      ) VALUES (
        ${owner.owner_id},
        'tax_deadline_reminder',
        ${owner.owner_email},
        ${subject},
        ${result.data?.id},
        'sent'
      )
    `;

    console.log(`   ✅ Sent to ${owner.owner_email}`);
  } catch (error) {
    console.error(`   Error processing tax deadline notification for ${owner.owner_email}:`, error);
  }
}

async function processReceiptGenerationNotification(owner) {
  try {
    const preference = await checkNotificationPreference(owner.owner_id, 'receipt_generation_reminder');
    if (!preference.enabled || !preference.email_enabled) {
      console.log(`   Skipping ${owner.owner_email} - notification disabled`);
      return;
    }

    // Check if we already sent a receipt generation reminder this month
    const existingNotification = await sql`
      SELECT id FROM notification_history
      WHERE user_id = ${owner.owner_id}
        AND notification_type = 'receipt_generation_reminder'
        AND sent_at > date_trunc('month', now())
    `;

    if (existingNotification.length > 0) {
      console.log(`   Skipping ${owner.owner_email} - reminder already sent this month`);
      return;
    }

    const subject = `Senhorio: ${owner.paid_payments_count} Recibo${owner.paid_payments_count > 1 ? 's' : ''} Pendente${owner.paid_payments_count > 1 ? 's' : ''}`;
    const bodyHtml = generateReceiptGenerationReminderEmail(owner.owner_name);

    if (DRY_RUN) {
      console.log(`   [DRY RUN] Would send to ${owner.owner_email}: ${subject}`);
      return;
    }

    const result = await resend.emails.send({
      from: 'Senhorio <notificacoes@senhorio.pt>',
      to: owner.owner_email,
      subject,
      html: bodyHtml,
    });

    if (result.error) {
      console.error(`   Error sending to ${owner.owner_email}:`, result.error);
      return;
    }

    await sql`
      INSERT INTO notification_history (
        user_id,
        notification_type,
        recipient_email,
        subject,
        resend_message_id,
        status
      ) VALUES (
        ${owner.owner_id},
        'receipt_generation_reminder',
        ${owner.owner_email},
        ${subject},
        ${result.data?.id},
        'sent'
      )
    `;

    console.log(`   ✅ Sent to ${owner.owner_email}`);
  } catch (error) {
    console.error(`   Error processing receipt generation notification for ${owner.owner_email}:`, error);
  }
}

function generateTaxDeadlineReminderEmail(userName) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f59e0b; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          background-color: #f59e0b;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        }
        .deadline-info { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Senhorio</h1>
          <p>📋 Lembrete de Obrigações Fiscais</p>
        </div>
        <div class="content">
          <p>Olá ${userName || 'Senhorio'},</p>

          <div class="deadline-info">
            <p><strong>Importante:</strong> As obrigações fiscais para senhorios estão a aproximar-se!</p>
          </div>

          <p>Como senhorio em Portugal, tem várias obrigações fiscais importantes:</p>
          <ul>
            <li><strong>Declaração de IRS:</strong> Até 31 de março (ou 31 de maio se submetida online)</li>
            <li><strong>Pagamentos por conta:</strong> Julho, setembro, e dezembro</li>
            <li><strong>Recibos de renda:</strong> Devem ser emitidos mensalmente através do Portal das Finanças</li>
          </ul>

          <p>Use o Senhorio para:</p>
          <ul>
            <li>Exportar relatórios fiscais para a sua declaração de IRS</li>
            <li>Acompanhar despesas dedutíveis</li>
            <li>Gerar recibos de renda em conformidade</li>
          </ul>

          <a href="https://senhorio.pt/dashboard/tax-reports" class="button">Ver Relatórios Fiscais</a>

          <p>Mantenha-se em dia com as suas obrigações fiscais!</p>
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

function generateReceiptGenerationReminderEmail(userName) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #7c3aed; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button {
          display: inline-block;
          background-color: #7c3aed;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin: 10px 0;
        }
        .reminder { background-color: #f3e8ff; border-left: 4px solid #7c3aed; padding: 15px; margin: 15px 0; }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Senhorio</h1>
          <p>📄 Lembrete de Recibos Pendentes</p>
        </div>
        <div class="content">
          <p>Olá ${userName || 'Senhorio'},</p>

          <div class="reminder">
            <p><strong>Lembrete:</strong> Tem recibos de renda pendentes de emissão.</p>
          </div>

          <p>Como senhorio, é obrigatório emitir recibos de renda para todos os pagamentos recebidos. Isto é importante para:</p>
          <ul>
            <li>Cumprimento da legislação portuguesa</li>
            <li>Documentação para a declaração de IRS</li>
            <li>Transparência com os inquilinos</li>
            <li>Registo oficial dos rendimentos prediais</li>
          </ul>

          <p>O Senhorio facilita a geração automática de recibos em conformidade com a legislação portuguesa.</p>

          <a href="https://senhorio.pt/dashboard/receipts" class="button">Gerar Recibos</a>

          <p>Mantenha a sua documentação em dia e evite complicações fiscais!</p>
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

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };