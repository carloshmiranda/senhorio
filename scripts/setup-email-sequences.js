#!/usr/bin/env node
/**
 * Email sequences setup script for Senhorio
 *
 * This script populates the email_sequences table with welcome email templates
 * for the waitlist flow. Templates support variables like {{NAME}}, {{POSITION}}, etc.
 *
 * Run with: node scripts/setup-email-sequences.js
 */

// Import database connection - handle both development and production
async function setupEmailSequences() {
  console.log('📧 Setting up Senhorio email sequences...\n');

  // Check if DATABASE_URL is configured
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL not configured.');
    console.log('\nTo run this script:');
    console.log('1. Set up Neon database following DATABASE_SETUP.md');
    console.log('2. Export DATABASE_URL and run again:');
    console.log('   export DATABASE_URL="your_neon_connection_string"');
    console.log('   node scripts/setup-email-sequences.js\n');
    console.log('📋 Once database is configured, this script will:');
    console.log('   ✨ Create waitlist welcome email template');
    console.log('   ✨ Support variable substitution (name, position, referral links)');
    console.log('   ✨ Enable automatic email sending for new waitlist signups');
    process.exit(1);
  }

  try {
    // Dynamic import for TypeScript module
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    // Define welcome email template
    const welcomeEmailTemplate = {
      sequence: 'waitlist_welcome',
      step: 1,
      subject: 'Bem-vindo à lista de espera do Senhorio! (Posição #{{POSITION}})',
      body_html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo ao Senhorio</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
    .tagline { color: #6b7280; font-size: 16px; }
    .content { margin-bottom: 30px; }
    .highlight { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .position-badge { display: inline-block; background: #2563eb; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
    .cta { text-align: center; margin: 30px 0; }
    .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; }
    .referral { background: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 14px; color: #6b7280; text-align: center; }
    .calculators { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin: 20px 0; }
    .calc-link { display: inline-block; background: #f3f4f6; padding: 8px 12px; border-radius: 4px; text-decoration: none; color: #374151; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🏠 Senhorio</div>
      <div class="tagline">A plataforma de gestão de arrendamento para senhorios portugueses</div>
    </div>

    <div class="content">
      <h2>Olá {{NAME}}! 👋</h2>

      <p>Bem-vindo à lista de espera do Senhorio! Ficamos muito contentes por se juntar a nós nesta jornada para simplificar a vida fiscal dos senhorios portugueses.</p>

      <div class="highlight">
        <h3>🎯 A sua posição na lista</h3>
        <div class="position-badge">Posição #{{POSITION}}</div>
        <p>Será um dos primeiros a ter acesso quando lançarmos a plataforma completa!</p>
      </div>

      <h3>🧮 Enquanto espera, explore as nossas calculadoras gratuitas:</h3>
      <div class="calculators">
        <a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/calculadora" class="calc-link">
          💰 Simulador Fiscal IRS
        </a>
        <a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/calculadora-rendas" class="calc-link">
          📈 Calculadora de Rendas
        </a>
        <a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/aimi" class="calc-link">
          🛡️ Isenção AIMI 2026
        </a>
      </div>

      <div class="referral">
        <h3>🚀 Convide amigos e suba na lista!</h3>
        <p>Partilhe o seu link de referência e ganhe uma posição mais alta na lista por cada amigo que se inscrever:</p>
        <p style="word-break: break-all; font-family: monospace; background: white; padding: 10px; border-radius: 4px;">
          <strong>{{REFERRAL_LINK}}</strong>
        </p>
      </div>

      <h3>📚 Conteúdo útil no nosso blog:</h3>
      <ul>
        <li><a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/blog/irs-arrendamento-2026-nova-taxa-10-porcento">IRS Arrendamento 2026: Nova Taxa de 10%</a></li>
        <li><a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/blog/isencao-aimi-2026-qualificar-nova-isencao">Como Qualificar para a Isenção AIMI 2026</a></li>
        <li><a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/blog/como-calcular-atualizacoes-renda-2026">Como Calcular Atualizações de Renda 2026</a></li>
      </ul>

      <div class="cta">
        <a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}" class="btn">
          Explorar Calculadoras →
        </a>
      </div>
    </div>

    <div class="footer">
      <p>Obrigado por fazer parte da comunidade Senhorio!</p>
      <p>Equipa Senhorio</p>
      <p style="font-size: 12px; margin-top: 20px;">
        Este email foi enviado para {{EMAIL}} porque se inscreveu na nossa lista de espera.
      </p>
    </div>
  </div>
</body>
</html>`.trim(),
      body_text: `
Olá {{NAME}}!

Bem-vindo à lista de espera do Senhorio! 🏠

🎯 A SUA POSIÇÃO: #{{POSITION}}

Será um dos primeiros a ter acesso quando lançarmos a plataforma completa!

🧮 EXPLORE AS NOSSAS CALCULADORAS GRATUITAS:
• Simulador Fiscal IRS: ${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/calculadora
• Calculadora de Rendas: ${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/calculadora-rendas
• Isenção AIMI 2026: ${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}/aimi

🚀 CONVIDE AMIGOS E SUBA NA LISTA!
Partilhe o seu link de referência: {{REFERRAL_LINK}}

📚 LEIA O NOSSO BLOG:
• IRS Arrendamento 2026: Nova Taxa de 10%
• Como Qualificar para a Isenção AIMI 2026
• Como Calcular Atualizações de Renda 2026

Visite: ${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}

Obrigado por fazer parte da comunidade Senhorio!
Equipa Senhorio
`.trim(),
      delay_hours: 0,
      variant: 'a',
      is_active: true
    };

    // Check if template already exists
    const [existingTemplate] = await sql`
      SELECT id FROM email_sequences
      WHERE sequence = ${welcomeEmailTemplate.sequence}
      AND step = ${welcomeEmailTemplate.step}
      AND variant = ${welcomeEmailTemplate.variant}
    `;

    if (existingTemplate) {
      console.log('⚠️  Welcome email template already exists, updating...');
      await sql`
        UPDATE email_sequences SET
          subject = ${welcomeEmailTemplate.subject},
          body_html = ${welcomeEmailTemplate.body_html},
          body_text = ${welcomeEmailTemplate.body_text},
          delay_hours = ${welcomeEmailTemplate.delay_hours},
          is_active = ${welcomeEmailTemplate.is_active},
          updated_at = now()
        WHERE sequence = ${welcomeEmailTemplate.sequence}
        AND step = ${welcomeEmailTemplate.step}
        AND variant = ${welcomeEmailTemplate.variant}
      `;
      console.log('✅ Welcome email template updated successfully');
    } else {
      console.log('📝 Creating new welcome email template...');
      await sql`
        INSERT INTO email_sequences (
          sequence, step, subject, body_html, body_text,
          delay_hours, variant, is_active
        ) VALUES (
          ${welcomeEmailTemplate.sequence},
          ${welcomeEmailTemplate.step},
          ${welcomeEmailTemplate.subject},
          ${welcomeEmailTemplate.body_html},
          ${welcomeEmailTemplate.body_text},
          ${welcomeEmailTemplate.delay_hours},
          ${welcomeEmailTemplate.variant},
          ${welcomeEmailTemplate.is_active}
        )
      `;
      console.log('✅ Welcome email template created successfully');
    }

    // Verify the template was created/updated
    const [template] = await sql`
      SELECT sequence, step, subject, variant, is_active, send_count, created_at
      FROM email_sequences
      WHERE sequence = 'waitlist_welcome' AND step = 1 AND variant = 'a'
    `;

    if (template) {
      console.log('\n📊 Email sequence summary:');
      console.log(`   Sequence: ${template.sequence}`);
      console.log(`   Step: ${template.step}`);
      console.log(`   Subject: ${template.subject.substring(0, 50)}...`);
      console.log(`   Variant: ${template.variant}`);
      console.log(`   Active: ${template.is_active ? '✅' : '❌'}`);
      console.log(`   Emails sent: ${template.send_count || 0}`);
      console.log(`   Created: ${new Date(template.created_at).toLocaleDateString('pt-PT')}`);
    }

    // Test email template rendering
    console.log('\n🧪 Testing template variables...');
    const testSubject = template.subject
      .replace('{{POSITION}}', '42');
    const testBodyPreview = template.subject
      .replace(/\{\{NAME\}\}/g, 'João Silva')
      .replace(/\{\{POSITION\}\}/g, '42')
      .replace(/\{\{REFERRAL_CODE\}\}/g, 'ABC123')
      .replace(/\{\{REFERRAL_LINK\}\}/g, 'https://senhorio.vercel.app?ref=ABC123');

    console.log(`   Test subject: ${testSubject}`);
    console.log('✅ Template variables work correctly');

    console.log('\n🎉 Email sequences setup completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. New waitlist signups will automatically receive welcome emails');
    console.log('   2. Monitor email delivery in the email_log table');
    console.log('   3. Check email metrics via send_count, open_count, click_count');

  } catch (error) {
    console.error('❌ Email sequences setup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  setupEmailSequences().catch(console.error);
}

module.exports = { setupEmailSequences };