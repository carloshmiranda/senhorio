import { Resend } from "resend";
import { getDb } from "@/lib/db";

let resend: Resend | null = null;

function getResendClient() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

interface EmailSequenceTemplate {
  id: string;
  sequence: string;
  step: number;
  subject: string;
  body_html: string;
  body_text?: string;
  delay_hours: number;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  sequenceId?: string;
}

/**
 * Send an email via Resend and log it to the database
 */
export async function sendEmail({ to, subject, html, text, sequenceId }: SendEmailParams) {
  try {
    const fromEmail = process.env.FROM_EMAIL || "noreply@senhorio.com";

    const resendClient = getResendClient();
    const response = await resendClient.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
      text,
    });

    const sql = getDb();

    // Log the email to our database
    await sql`
      INSERT INTO email_log (recipient, sequence_id, subject, resend_id, status)
      VALUES (${to}, ${sequenceId || null}, ${subject}, ${response.data?.id || null}, 'sent')
    `;

    // Update sequence send count if applicable
    if (sequenceId) {
      await sql`
        UPDATE email_sequences
        SET send_count = send_count + 1
        WHERE id = ${sequenceId}
      `;
    }

    return { success: true, id: response.data?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Get email sequence templates by sequence name (e.g., "waitlist_welcome")
 */
export async function getEmailSequence(sequenceName: string): Promise<EmailSequenceTemplate[]> {
  const sql = getDb();

  const templates = await sql`
    SELECT id, sequence, step, subject, body_html, body_text, delay_hours
    FROM email_sequences
    WHERE sequence = ${sequenceName}
      AND is_active = true
    ORDER BY step ASC
  ` as EmailSequenceTemplate[];

  return templates;
}

/**
 * Send a welcome email sequence to a new waitlist user
 */
export async function sendWaitlistWelcomeEmail(email: string, name?: string) {
  try {
    const sequences = await getEmailSequence("waitlist_welcome");

    if (sequences.length === 0) {
      console.warn("No waitlist welcome email sequence found");
      return { success: false, error: "No email templates configured" };
    }

    // Send the first email in the sequence (step 1)
    const firstEmail = sequences[0];

    // Replace template variables
    let html = firstEmail.body_html;
    let text = firstEmail.body_text || "";
    let subject = firstEmail.subject;

    // Simple template substitutions
    const substitutions = {
      "{{name}}": name || "Senhorio",
      "{{email}}": email
    };

    Object.entries(substitutions).forEach(([key, value]) => {
      html = html.replace(new RegExp(key, "g"), value);
      text = text.replace(new RegExp(key, "g"), value);
      subject = subject.replace(new RegExp(key, "g"), value);
    });

    const result = await sendEmail({
      to: email,
      subject,
      html,
      text: text || undefined,
      sequenceId: firstEmail.id
    });

    return result;
  } catch (error) {
    console.error("Welcome email error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Initialize default email sequences in the database
 */
export async function initializeEmailSequences() {
  const sql = getDb();

  // Check if waitlist welcome sequence already exists
  const existing = await sql`
    SELECT id FROM email_sequences
    WHERE sequence = 'waitlist_welcome'
    LIMIT 1
  `;

  if (existing.length > 0) {
    console.log("Email sequences already initialized");
    return { success: true, message: "Already exists" };
  }

  try {
    // Insert welcome email sequence
    await sql`
      INSERT INTO email_sequences (sequence, step, subject, body_html, body_text, delay_hours)
      VALUES
      (
        'waitlist_welcome',
        1,
        'Bem-vindo ao Senhorio! 🏠 Confirmação da Lista de Espera',
        ${welcomeEmailHTML},
        ${welcomeEmailText},
        0
      )
    `;

    console.log("Email sequences initialized successfully");
    return { success: true, message: "Sequences created" };
  } catch (error) {
    console.error("Failed to initialize email sequences:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
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