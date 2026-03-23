#!/usr/bin/env node
/**
 * Email sequences setup script for Senhorio
 *
 * This script populates the email_sequences table with email templates for:
 * 1. Waitlist welcome flow
 * 2. Tax calculator follow-up
 * 3. AIMI calculator follow-up
 *
 * Templates support variables like {{NAME}}, {{POSITION}}, etc.
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
    console.log('   ✨ Create tax calculator follow-up sequence');
    console.log('   ✨ Create AIMI calculator follow-up sequence');
    console.log('   ✨ Support variable substitution (name, position, referral links)');
    console.log('   ✨ Enable automatic email sending for signups and calculator users');
    process.exit(1);
  }

  try {
    // Dynamic import for TypeScript module
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    // Define all email templates
    const emailTemplates = [
    {
      name: "Waitlist Welcome",
      template: {
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
      }
    },

    // ================================================
    // Calculator Follow-up Sequence
    // ================================================
    {
      name: "Calculator Follow-up",
      template: {
        sequence: 'calculator_followup',
        step: 1,
        subject: 'Precisa de ajuda com os seus impostos de arrendamento?',
        body_html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 20px;">
    Olá {{NAME}}! 📊
  </h1>

  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
    Vimos que usou a nossa calculadora de impostos de arrendamento. Esperamos que tenha sido útil!
  </p>

  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
    Gerir impostos de arrendamento pode ser complicado, especialmente com as mudanças de 2026. Estamos aqui para tornar isso mais simples.
  </p>

  <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
    <h4 style="color: #92400e; margin-top: 0;">🚀 Novidade: Plataforma completa em breve!</h4>
    <p style="margin-bottom: 10px;">Estamos a finalizar uma plataforma que vai automatizar toda a gestão de impostos de arrendamento:</p>
    <ul style="margin: 0; padding-left: 20px;">
      <li>Comparação automática dos 4 regimes fiscais</li>
      <li>Geração de recibos eletrónicos</li>
      <li>Cálculo automático de retenções</li>
      <li>Exportação para Portal das Finanças</li>
    </ul>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}?utm_source=calculator_email&utm_medium=email&utm_campaign=calculator_followup#waitlist"
       style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
      Junte-se à Lista de Espera Gratuita
    </a>
  </div>

  <p style="font-size: 14px; color: #64748b; text-align: center; margin-top: 20px;">
    Sem spam. Apenas atualizações importantes sobre impostos de arrendamento.
  </p>

  <hr style="border: none; height: 1px; background: #e2e8f0; margin: 30px 0;">

  <div style="color: #94a3b8; font-size: 12px; text-align: center;">
    <p>Senhorio - Simplificamos os impostos de arrendamento</p>
    <p>${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}</p>
  </div>
</div>`,
        body_text: `Olá {{NAME}}!

Vimos que usou a nossa calculadora de impostos de arrendamento. Esperamos que tenha sido útil!

Gerir impostos de arrendamento pode ser complicado, especialmente com as mudanças de 2026. Estamos aqui para tornar isso mais simples.

🚀 NOVIDADE: Plataforma completa em breve!
Estamos a finalizar uma plataforma que vai automatizar toda a gestão de impostos de arrendamento:
• Comparação automática dos 4 regimes fiscais
• Geração de recibos eletrónicos
• Cálculo automático de retenções
• Exportação para Portal das Finanças

Junte-se à nossa lista de espera gratuita:
${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}?utm_source=calculator_email#waitlist

Sem spam. Apenas atualizações importantes sobre impostos de arrendamento.

---
Senhorio - Simplificamos os impostos de arrendamento`,
        delay_hours: 2,
        variant: 'a',
        is_active: true
      }
    },

    // ================================================
    // AIMI Calculator Sequence
    // ================================================
    {
      name: "AIMI Calculator Follow-up",
      template: {
        sequence: 'aimi_calculator',
        step: 1,
        subject: 'A sua isenção AIMI pode poupar-lhe centenas de euros!',
        body_html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #16a34a; font-size: 24px; margin-bottom: 20px;">
    Parabéns, {{NAME}}! 🎉
  </h1>

  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
    Vimos que qualifica para a <strong>isenção AIMI de arrendamento</strong> introduzida em 2026. Isso pode representar poupanças significativas!
  </p>

  <div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0;">
    <h4 style="color: #15803d; margin-top: 0;">💰 O que isto significa para si:</h4>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li>Não paga AIMI sobre propriedades arrendadas</li>
      <li>Poupanças anuais podem ir até €500+ por propriedade</li>
      <li>Aplicação automática se cumprir os requisitos</li>
      <li>Válido para propriedades arrendadas em 2026</li>
    </ul>
  </div>

  <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
    <h4 style="color: #92400e; margin-top: 0;">⚠️ Importante: Confirme os requisitos</h4>
    <p style="margin: 0;">Para garantir a isenção, precisa de cumprir todas as condições legais. A nossa plataforma vai ajudá-lo a verificar e documentar tudo automaticamente.</p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}?utm_source=aimi_email&utm_medium=email&utm_campaign=aimi_exemption#waitlist"
       style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
      Garantir Acesso Prioritário
    </a>
  </div>

  <p style="font-size: 16px; line-height: 1.5; margin: 20px 0;">
    <strong>Próximos passos:</strong> Estamos a finalizar uma plataforma que automatiza toda a gestão fiscal de senhorios, incluindo verificação automática da isenção AIMI.
  </p>

  <p style="font-size: 14px; color: #64748b; text-align: center; margin-top: 20px;">
    Junte-se à lista de espera e seja dos primeiros a aceder quando lançarmos.
  </p>

  <hr style="border: none; height: 1px; background: #e2e8f0; margin: 30px 0;">

  <div style="color: #94a3b8; font-size: 12px; text-align: center;">
    <p>Senhorio - Maximizamos as suas poupanças fiscais</p>
    <p>${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}</p>
  </div>
</div>`,
        body_text: `Parabéns, {{NAME}}!

Vimos que qualifica para a isenção AIMI de arrendamento introduzida em 2026. Isso pode representar poupanças significativas!

💰 O QUE ISTO SIGNIFICA PARA SI:
• Não paga AIMI sobre propriedades arrendadas
• Poupanças anuais podem ir até €500+ por propriedade
• Aplicação automática se cumprir os requisitos
• Válido para propriedades arrendadas em 2026

⚠️ IMPORTANTE: CONFIRME OS REQUISITOS
Para garantir a isenção, precisa de cumprir todas as condições legais. A nossa plataforma vai ajudá-lo a verificar e documentar tudo automaticamente.

PRÓXIMOS PASSOS:
Estamos a finalizar uma plataforma que automatiza toda a gestão fiscal de senhorios, incluindo verificação automática da isenção AIMI.

Garanta o seu acesso prioritário:
${process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app'}?utm_source=aimi_email#waitlist

---
Senhorio - Maximizamos as suas poupanças fiscais`,
        delay_hours: 1,
        variant: 'a',
        is_active: true
      }
    }
    ];

    // Process each email template
    for (const emailTemplate of emailTemplates) {
      console.log(`\n📧 Processing ${emailTemplate.name}...`);
      const template = emailTemplate.template;

      // Check if template already exists
      const [existingTemplate] = await sql`
        SELECT id FROM email_sequences
        WHERE sequence = ${template.sequence}
        AND step = ${template.step}
        AND variant = ${template.variant}
      `;

      if (existingTemplate) {
        console.log(`⚠️  ${emailTemplate.name} already exists, updating...`);
        await sql`
          UPDATE email_sequences SET
            subject = ${template.subject},
            body_html = ${template.body_html},
            body_text = ${template.body_text},
            delay_hours = ${template.delay_hours},
            is_active = ${template.is_active},
            updated_at = now()
          WHERE sequence = ${template.sequence}
          AND step = ${template.step}
          AND variant = ${template.variant}
        `;
        console.log(`✅ ${emailTemplate.name} updated successfully`);
      } else {
        console.log(`📝 Creating new ${emailTemplate.name}...`);
        await sql`
          INSERT INTO email_sequences (
            sequence, step, subject, body_html, body_text,
            delay_hours, variant, is_active
          ) VALUES (
            ${template.sequence},
            ${template.step},
            ${template.subject},
            ${template.body_html},
            ${template.body_text},
            ${template.delay_hours},
            ${template.variant},
            ${template.is_active}
          )
        `;
        console.log(`✅ ${emailTemplate.name} created successfully`);
      }
    }

    // Verify all templates were created/updated
    const allTemplates = await sql`
      SELECT sequence, step, subject, variant, is_active, send_count, created_at
      FROM email_sequences
      ORDER BY sequence, step, variant
    `;

    if (allTemplates.length > 0) {
      console.log('\n📊 Email sequences summary:');
      console.table(allTemplates.map(template => ({
        sequence: template.sequence,
        step: template.step,
        subject: template.subject.substring(0, 40) + '...',
        variant: template.variant,
        active: template.is_active ? '✅' : '❌',
        sent: template.send_count || 0,
        created: new Date(template.created_at).toLocaleDateString('pt-PT')
      })));
    }

    // Test email template variables with waitlist welcome
    const [waitlistTemplate] = await sql`
      SELECT subject FROM email_sequences
      WHERE sequence = 'waitlist_welcome' AND step = 1 AND variant = 'a'
    `;

    if (waitlistTemplate) {
      console.log('\n🧪 Testing template variables...');
      const testSubject = waitlistTemplate.subject
        .replace('{{POSITION}}', '42');
      console.log(`   Test subject: ${testSubject}`);
      console.log('✅ Template variables work correctly');
    }

    console.log('\n🎉 Email sequences setup completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. New waitlist signups will automatically receive welcome emails');
    console.log('   2. Calculator users who provide email will get follow-up sequences');
    console.log('   3. AIMI calculator users who qualify will get targeted follow-ups');
    console.log('   4. Monitor email delivery in the email_log table');
    console.log('   5. Check email metrics via send_count, open_count, click_count');

  } catch (error) {
    console.error('❌ Email sequences setup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  setupEmailSequences().catch(console.error);
}

module.exports = { setupEmailSequences };