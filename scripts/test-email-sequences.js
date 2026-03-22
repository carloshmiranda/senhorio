#!/usr/bin/env node

/**
 * Test Email Sequences Script
 *
 * This script tests email sequence functionality:
 * - Database connectivity
 * - Email sequence retrieval
 * - Template rendering
 * - (Optional) Actual email sending if RESEND_API_KEY is configured
 */

const { neon } = require("@neondatabase/serverless");

async function testEmailSequences() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || databaseUrl.includes("placeholder")) {
    console.error("❌ DATABASE_URL not properly configured");
    process.exit(1);
  }

  try {
    console.log("🧪 Testing email sequences...\n");

    console.log("🔗 Connecting to database...");
    const sql = neon(databaseUrl);

    // Test connection
    await sql`SELECT 1`;
    console.log("✅ Database connection successful!\n");

    // Check email sequences
    console.log("📧 Checking email sequences...");
    const sequences = await sql`
      SELECT id, sequence, step, subject, length(body_html) as html_length,
             delay_hours, variant, is_active, send_count, open_count, click_count
      FROM email_sequences
      ORDER BY sequence, step
    `;

    if (sequences.length === 0) {
      console.log("❌ No email sequences found!");
      console.log("   Run: node scripts/setup-email-sequences.js");
      return;
    }

    console.log(`✅ Found ${sequences.length} email sequence(s):\n`);
    sequences.forEach(seq => {
      console.log(`  📬 ${seq.sequence} (step ${seq.step})`);
      console.log(`      Subject: ${seq.subject}`);
      console.log(`      HTML Length: ${seq.html_length} chars`);
      console.log(`      Active: ${seq.is_active ? '✅' : '❌'}`);
      console.log(`      Stats: ${seq.send_count} sent, ${seq.open_count} opened, ${seq.click_count} clicked\n`);
    });

    // Test template rendering
    console.log("🎨 Testing template rendering...");
    const [welcomeTemplate] = await sql`
      SELECT subject, body_html, body_text
      FROM email_sequences
      WHERE sequence = 'waitlist_welcome' AND step = 1
      LIMIT 1
    `;

    if (!welcomeTemplate) {
      console.log("❌ Welcome template not found");
      return;
    }

    // Test template substitutions
    const testName = "João Silva";
    const testEmail = "test@example.com";

    let subject = welcomeTemplate.subject;
    let html = welcomeTemplate.body_html;
    let text = welcomeTemplate.body_text || "";

    // Apply substitutions
    const substitutions = {
      "{{name}}": testName,
      "{{email}}": testEmail
    };

    Object.entries(substitutions).forEach(([key, value]) => {
      subject = subject.replace(new RegExp(key, "g"), value);
      html = html.replace(new RegExp(key, "g"), value);
      text = text.replace(new RegExp(key, "g"), value);
    });

    console.log(`✅ Template rendering successful:`);
    console.log(`   Subject: ${subject}`);
    console.log(`   HTML contains "${testName}": ${html.includes(testName) ? '✅' : '❌'}`);
    console.log(`   Text contains "${testName}": ${text.includes(testName) ? '✅' : '❌'}\n`);

    // Test Resend configuration (optional)
    const resendKey = process.env.RESEND_API_KEY;
    console.log("📨 Checking email sending configuration...");

    if (!resendKey) {
      console.log("⚠️  RESEND_API_KEY not configured - email sending will fail");
      console.log("   Set RESEND_API_KEY environment variable to enable email sending\n");
    } else {
      console.log("✅ RESEND_API_KEY configured");

      // Optional: Test actual email sending
      const testSend = process.argv.includes('--send-test');
      if (testSend) {
        console.log("🚀 Sending test email...");

        try {
          const { sendWaitlistWelcomeEmail } = require("../src/lib/email.ts");
          const result = await sendWaitlistWelcomeEmail("test@example.com", "Test User");

          if (result.success) {
            console.log("✅ Test email sent successfully!");
          } else {
            console.log(`❌ Test email failed: ${result.error}`);
          }
        } catch (error) {
          console.log(`❌ Test email failed: ${error.message}`);
        }
      } else {
        console.log("   Use --send-test flag to send a test email\n");
      }
    }

    // Check email log
    console.log("📊 Checking email logs...");
    const [logStats] = await sql`
      SELECT COUNT(*) as total,
             COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent,
             COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered,
             COUNT(CASE WHEN status = 'opened' THEN 1 END) as opened,
             COUNT(CASE WHEN status = 'clicked' THEN 1 END) as clicked
      FROM email_log
    `;

    console.log(`   Total emails: ${logStats.total}`);
    console.log(`   Sent: ${logStats.sent}`);
    console.log(`   Delivered: ${logStats.delivered}`);
    console.log(`   Opened: ${logStats.opened}`);
    console.log(`   Clicked: ${logStats.clicked}\n`);

    // Test waitlist integration
    console.log("👥 Checking waitlist integration...");
    const [waitlistCount] = await sql`SELECT COUNT(*) as count FROM waitlist`;
    console.log(`   Total waitlist entries: ${waitlistCount.count}\n`);

    console.log("🎉 Email sequences test complete!");
    console.log("\nTo test the full flow:");
    console.log("  1. Visit your app and join the waitlist");
    console.log("  2. Check your email for the welcome message");
    console.log("  3. Monitor email_log table for delivery status");

  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  testEmailSequences();
}