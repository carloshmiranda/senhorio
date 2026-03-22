#!/usr/bin/env node

/**
 * Setup Email Sequences Script
 *
 * This script initializes default email sequences in the database.
 * Run after database setup to configure welcome emails.
 */

const { neon } = require("@neondatabase/serverless");

async function setupEmailSequences() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  if (databaseUrl.includes("placeholder")) {
    console.error("❌ DATABASE_URL contains placeholder values. Please configure with real Neon connection string.");
    process.exit(1);
  }

  try {
    console.log("🔗 Connecting to database...");
    const sql = neon(databaseUrl);

    // Test connection
    await sql`SELECT 1`;
    console.log("✅ Database connection successful!");

    // Check if email sequences table exists
    const [tableExists] = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'email_sequences'
      );
    `;

    if (!tableExists.exists) {
      console.error("❌ email_sequences table not found. Please run database schema setup first.");
      process.exit(1);
    }

    // Check if waitlist welcome sequence already exists
    const [existing] = await sql`
      SELECT id FROM email_sequences
      WHERE sequence = 'waitlist_welcome'
      LIMIT 1
    `;

    if (existing) {
      console.log("✅ Email sequences already initialized");
      return;
    }

    console.log("📧 Initializing email sequences...");

    // Insert welcome email sequence
    await sql`
      INSERT INTO email_sequences (sequence, step, subject, body_html, body_text, delay_hours)
      VALUES (
        'waitlist_welcome',
        1,
        'Bem-vindo ao Senhorio! 🏠 Confirmação da Lista de Espera',
        ${welcomeEmailHTML},
        ${welcomeEmailText},
        0
      )
    `;

    console.log("✅ Welcome email sequence created");

    // Verify the sequences were created
    const sequences = await sql`
      SELECT sequence, step, subject, is_active
      FROM email_sequences
      ORDER BY sequence, step
    `;

    console.log("\n📊 Email sequences summary:");
    sequences.forEach(seq => {
      console.log(`  • ${seq.sequence} (step ${seq.step}): ${seq.subject} ${seq.is_active ? '✓' : '✗'}`);
    });

    console.log("\n🎉 Email sequences setup complete!");
    console.log("\nNext steps:");
    console.log("  1. Configure RESEND_API_KEY in Vercel environment variables");
    console.log("  2. Set FROM_EMAIL (e.g., noreply@yourdomain.com)");
    console.log("  3. Test with: node scripts/test-email-sequences.js");

  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    process.exit(1);
  }
}

// Welcome email templates
const welcomeEmailHTML = `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Senhorio</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin-bottom: 10px;">🏠 Senhorio</h1>
        <p style="color: #666; font-size: 16px;">A plataforma completa para senhorios portugueses</p>
    </div>

    <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <h2 style="color: #1e40af; margin-top: 0;">Bem-vindo, {{name}}! 🎉</h2>
        <p>Obrigado por se juntar à nossa lista de espera. Está agora na fila para acesso antecipado ao Senhorio, a primeira plataforma portuguesa desenhada especificamente para senhorios individuais.</p>
    </div>

    <h3 style="color: #1e40af;">O que pode fazer enquanto espera:</h3>

    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0;">
        <h4 style="margin-top: 0; color: #374151;">🧮 Simulador Fiscal Gratuito</h4>
        <p>Compare os 4 regimes fiscais portugueses e descubra qual resulta em menor imposto para o seu perfil.</p>
        <a href="https://senhorio.vercel.app/calculadora" style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 10px;">Usar Simulador</a>
    </div>

    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0;">
        <h4 style="margin-top: 0; color: #374151;">📊 Calculadora de Rendas</h4>
        <p>Calcule atualizações de renda com o coeficiente INE oficial (2,24% para 2026).</p>
        <a href="https://senhorio.vercel.app/calculadora-rendas" style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 10px;">Calcular Rendas</a>
    </div>

    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0;">
        <h4 style="margin-top: 0; color: #374151;">✅ Verificador AIMI 2026</h4>
        <p>Verifique se qualifica para a nova isenção AIMI para rendas até €2.300/mês.</p>
        <a href="https://senhorio.vercel.app/aimi" style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 10px;">Verificar Isenção</a>
    </div>

    <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h3 style="margin-top: 0; color: #92400e;">📝 O que vem a seguir</h3>
        <p style="color: #92400e; margin-bottom: 0;">Quando o Senhorio estiver pronto, contactaremos os primeiros da lista para acesso antecipado. Vai receber:</p>
        <ul style="color: #92400e;">
            <li>Gestão de propriedades e inquilinos</li>
            <li>Geração automática de recibos de renda</li>
            <li>Cálculo automático de IRS com Anexo F</li>
            <li>Controlo de despesas dedutíveis</li>
        </ul>
    </div>

    <div style="text-align: center; margin-top: 40px; color: #666; font-size: 14px;">
        <p>Tem questões? Responda a este email - lemos todas as mensagens!</p>
        <p style="margin-top: 20px;">
            <strong>Senhorio Team</strong><br>
            A simplificar a vida fiscal dos senhorios portugueses
        </p>
    </div>
</body>
</html>
`;

const welcomeEmailText = `
Bem-vindo ao Senhorio! 🏠

Olá {{name}},

Obrigado por se juntar à nossa lista de espera. Está agora na fila para acesso antecipado ao Senhorio, a primeira plataforma portuguesa desenhada especificamente para senhorios individuais.

O que pode fazer enquanto espera:

🧮 SIMULADOR FISCAL GRATUITO
Compare os 4 regimes fiscais portugueses e descubra qual resulta em menor imposto para o seu perfil.
→ https://senhorio.vercel.app/calculadora

📊 CALCULADORA DE RENDAS
Calcule atualizações de renda com o coeficiente INE oficial (2,24% para 2026).
→ https://senhorio.vercel.app/calculadora-rendas

✅ VERIFICADOR AIMI 2026
Verifique se qualifica para a nova isenção AIMI para rendas até €2.300/mês.
→ https://senhorio.vercel.app/aimi

📝 O que vem a seguir:
Quando o Senhorio estiver pronto, contactaremos os primeiros da lista para acesso antecipado. Vai receber:
- Gestão de propriedades e inquilinos
- Geração automática de recibos de renda
- Cálculo automático de IRS com Anexo F
- Controlo de despesas dedutíveis

Tem questões? Responda a este email - lemos todas as mensagens!

Obrigado,
Senhorio Team
A simplificar a vida fiscal dos senhorios portugueses
`;

if (require.main === module) {
  setupEmailSequences();
}