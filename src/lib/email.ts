/**
 * Email utilities for Senhorio
 *
 * Provides email sending functionality using Resend with lazy initialization
 * and template variable substitution for email sequences.
 */

// Lazy-initialized Resend client
let resendClient: any = null;

async function getResendClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export interface EmailTemplate {
  subject: string;
  body_html: string;
  body_text?: string;
}

export interface EmailVariables {
  [key: string]: string;
}

/**
 * Substitute template variables in email content
 * Replaces {{VARIABLE}} patterns with actual values
 */
export function substituteVariables(
  template: string,
  variables: EmailVariables
): string {
  let result = template;

  Object.entries(variables).forEach(([key, value]) => {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(pattern, value || '');
  });

  return result;
}

/**
 * Send an email using Resend with template variable substitution
 */
export async function sendEmail({
  to,
  template,
  variables = {},
  from,
}: {
  to: string;
  template: EmailTemplate;
  variables?: EmailVariables;
  from?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const resend = await getResendClient();

    if (!resend) {
      return { success: false, error: 'Resend not configured (RESEND_API_KEY missing)' };
    }

    // Substitute variables in template
    const subject = substituteVariables(template.subject, variables);
    const html = substituteVariables(template.body_html, variables);
    const text = template.body_text ? substituteVariables(template.body_text, variables) : undefined;

    // Default from address
    const fromAddress = from || `Senhorio <hello@${process.env.SENDING_DOMAIN || 'resend.dev'}>`;

    // Send email via Resend
    const result = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html,
      text,
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };

  } catch (error: any) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

/**
 * Send welcome email to waitlist signups
 */
export async function sendWaitlistWelcome({
  email,
  name,
  position,
  referralCode,
  referralLink
}: {
  email: string;
  name?: string;
  position: number;
  referralCode: string;
  referralLink: string;
}) {
  // This will be handled by the waitlist API which queries the database
  // for the welcome email template. This function is for future use
  // when we might want to send emails programmatically.
  throw new Error('Use waitlist API for welcome emails - this ensures database templates are used');
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate unsubscribe URL for email sequences
 */
export function generateUnsubscribeUrl(email: string, sequence?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://senhorio.vercel.app';
  const encoded = Buffer.from(email).toString('base64');

  if (sequence) {
    return `${baseUrl}/unsubscribe?token=${encoded}&seq=${sequence}`;
  }

  return `${baseUrl}/unsubscribe?token=${encoded}`;
}