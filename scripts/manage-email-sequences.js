#!/usr/bin/env node
/**
 * Email sequences management script for Senhorio
 *
 * Interactive CLI tool for managing email templates:
 * - Setup initial templates
 * - View existing sequences
 * - Test email templates
 * - Update sequences
 * - Monitor email performance
 *
 * Usage:
 *   node scripts/manage-email-sequences.js [command]
 *
 * Commands:
 *   setup    - Set up initial email templates
 *   list     - List all email sequences
 *   test     - Test email template rendering
 *   stats    - Show email performance statistics
 *   verify   - Verify email configuration
 */

const readline = require('readline');

// Command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
    console.log('❌ Database not configured');
    console.log('\n📋 To set up the database:');
    console.log('1. Follow instructions in DATABASE_SETUP.md');
    console.log('2. Set DATABASE_URL environment variable');
    console.log('3. Run this script again');
    console.log('\nFor now, you can use "test" command to preview email templates.');
    return false;
  }

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);
    await sql`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
}

async function setupEmailSequences() {
  console.log('📧 Setting up email sequences...\n');

  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    return;
  }

  try {
    // Import the existing setup script
    const { setupEmailSequences } = require('./setup-email-sequences.js');
    await setupEmailSequences();
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

async function listEmailSequences() {
  console.log('📋 Email sequences:\n');

  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    console.log('⚠️  Database not available - showing template preview\n');
    showEmailTemplatePreview();
    return;
  }

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    const sequences = await sql`
      SELECT sequence, step, subject, delay_hours, variant, is_active,
             send_count, open_count, click_count, created_at
      FROM email_sequences
      ORDER BY sequence, step, variant
    `;

    if (sequences.length === 0) {
      console.log('📭 No email sequences found');
      console.log('   Run "setup" command to create initial templates');
      return;
    }

    // Group by sequence
    const grouped = sequences.reduce((acc, seq) => {
      if (!acc[seq.sequence]) acc[seq.sequence] = [];
      acc[seq.sequence].push(seq);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([sequenceName, steps]) => {
      console.log(`📧 ${sequenceName.toUpperCase()}`);
      steps.forEach(step => {
        const status = step.is_active ? '✅' : '❌';
        const stats = `(sent: ${step.send_count || 0}, opened: ${step.open_count || 0}, clicked: ${step.click_count || 0})`;
        console.log(`   Step ${step.step} [${step.variant}]: ${step.subject}`);
        console.log(`     ${status} Delay: ${step.delay_hours}h | ${stats}`);
      });
      console.log('');
    });

  } catch (error) {
    console.error('❌ Failed to list sequences:', error.message);
  }
}

async function showEmailStats() {
  console.log('📊 Email performance statistics:\n');

  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    return;
  }

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    // Overall stats
    const overview = await sql`
      SELECT
        sequence,
        SUM(send_count) as total_sent,
        SUM(open_count) as total_opened,
        SUM(click_count) as total_clicked,
        CASE
          WHEN SUM(send_count) > 0 THEN ROUND(SUM(open_count)::decimal / SUM(send_count) * 100, 1)
          ELSE 0
        END as open_rate,
        CASE
          WHEN SUM(send_count) > 0 THEN ROUND(SUM(click_count)::decimal / SUM(send_count) * 100, 1)
          ELSE 0
        END as click_rate
      FROM email_sequences
      WHERE is_active = true
      GROUP BY sequence
      ORDER BY total_sent DESC
    `;

    if (overview.length === 0) {
      console.log('📭 No email statistics available yet');
      return;
    }

    console.log('Overall Performance:');
    console.table(overview.map(stat => ({
      Sequence: stat.sequence,
      Sent: stat.total_sent || 0,
      Opened: stat.total_opened || 0,
      Clicked: stat.total_clicked || 0,
      'Open Rate': `${stat.open_rate}%`,
      'Click Rate': `${stat.click_rate}%`
    })));

    // Recent activity
    const recentSends = await sql`
      SELECT sequence, step, subject, send_count, updated_at
      FROM email_sequences
      WHERE send_count > 0 AND updated_at > now() - interval '30 days'
      ORDER BY updated_at DESC
      LIMIT 10
    `;

    if (recentSends.length > 0) {
      console.log('\nRecent Activity (Last 30 days):');
      recentSends.forEach(send => {
        console.log(`   ${send.sequence} step ${send.step}: ${send.send_count} sent (${new Date(send.updated_at).toLocaleDateString()})`);
      });
    }

  } catch (error) {
    console.error('❌ Failed to get stats:', error.message);
  }
}

function showEmailTemplatePreview() {
  console.log('📧 Email Template Preview:\n');

  const templates = [
    {
      name: 'Waitlist Welcome',
      sequence: 'waitlist_welcome',
      subject: 'Bem-vindo à lista de espera do Senhorio! (Posição #{{POSITION}})',
      delay: '0 hours',
      description: 'Sent immediately when someone joins the waitlist'
    },
    {
      name: 'Calculator Follow-up',
      sequence: 'calculator_followup',
      subject: 'Precisa de ajuda com os seus impostos de arrendamento?',
      delay: '2 hours',
      description: 'Sent to users who used the tax calculator'
    },
    {
      name: 'AIMI Calculator Follow-up',
      sequence: 'aimi_calculator',
      subject: 'A sua isenção AIMI pode poupar-lhe centenas de euros!',
      delay: '1 hour',
      description: 'Sent to users who qualify for AIMI exemption'
    }
  ];

  templates.forEach(template => {
    console.log(`📩 ${template.name}`);
    console.log(`   Subject: ${template.subject}`);
    console.log(`   Delay: ${template.delay}`);
    console.log(`   Purpose: ${template.description}`);
    console.log('');
  });
}

async function testEmailTemplate() {
  console.log('🧪 Email template testing:\n');

  // Show available templates
  showEmailTemplatePreview();

  const sequence = await question('Enter sequence name (waitlist_welcome, calculator_followup, aimi_calculator): ');
  const testData = {
    NAME: 'João Silva',
    EMAIL: 'joao@example.com',
    POSITION: '42',
    REFERRAL_LINK: 'https://senhorio.vercel.app/?ref=abc123'
  };

  console.log('\n🔧 Test data:');
  console.log(JSON.stringify(testData, null, 2));

  const dbConnected = await checkDatabaseConnection();

  if (dbConnected) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(process.env.DATABASE_URL);

      const [template] = await sql`
        SELECT subject, body_html, body_text
        FROM email_sequences
        WHERE sequence = ${sequence} AND step = 1 AND variant = 'a'
      `;

      if (!template) {
        console.log(`❌ Template ${sequence} not found in database`);
        return;
      }

      console.log('\n📧 Rendered Email:');
      console.log('Subject:', replaceTemplateVars(template.subject, testData));
      console.log('\nText version:');
      console.log(replaceTemplateVars(template.body_text, testData));

    } catch (error) {
      console.error('❌ Template test failed:', error.message);
    }
  } else {
    console.log('\n⚠️  Database not available - showing template structure only');
    console.log('Templates support these variables: {{NAME}}, {{EMAIL}}, {{POSITION}}, {{REFERRAL_LINK}}');
  }
}

function replaceTemplateVars(template, data) {
  let result = template;
  Object.entries(data).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return result;
}

async function verifyEmailSetup() {
  console.log('🔍 Verifying email setup...\n');

  // Check database connection
  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    console.log('❌ Cannot verify without database connection');
    return;
  }

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    // Check if email_sequences table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'email_sequences'
      )
    `;

    if (!tableExists[0].exists) {
      console.log('❌ email_sequences table not found');
      console.log('   Run: node scripts/setup-database.js');
      return;
    }

    // Check for required templates
    const requiredSequences = ['waitlist_welcome', 'calculator_followup', 'aimi_calculator'];
    let allFound = true;

    for (const seq of requiredSequences) {
      const [found] = await sql`
        SELECT COUNT(*) as count FROM email_sequences
        WHERE sequence = ${seq} AND is_active = true
      `;

      if (found.count == 0) {
        console.log(`❌ Missing sequence: ${seq}`);
        allFound = false;
      } else {
        console.log(`✅ Found sequence: ${seq} (${found.count} templates)`);
      }
    }

    if (allFound) {
      console.log('\n🎉 All email sequences configured correctly!');
      console.log('💡 Email automation is ready for waitlist signups');
    } else {
      console.log('\n⚠️  Some sequences missing - run "setup" command');
    }

    // Check environment variables for email sending
    console.log('\n📧 Email sending configuration:');
    if (process.env.RESEND_API_KEY) {
      console.log('✅ RESEND_API_KEY configured');
    } else {
      console.log('⚠️  RESEND_API_KEY not set (emails won\'t be sent)');
    }

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

async function interactiveMode() {
  console.log('🏠 Senhorio Email Sequences Manager\n');

  while (true) {
    console.log('Available commands:');
    console.log('  1. setup    - Set up initial email templates');
    console.log('  2. list     - List all email sequences');
    console.log('  3. test     - Test email template rendering');
    console.log('  4. stats    - Show email performance statistics');
    console.log('  5. verify   - Verify email configuration');
    console.log('  6. exit     - Exit\n');

    const choice = await question('Select command (1-6): ');

    switch (choice) {
      case '1':
      case 'setup':
        await setupEmailSequences();
        break;
      case '2':
      case 'list':
        await listEmailSequences();
        break;
      case '3':
      case 'test':
        await testEmailTemplate();
        break;
      case '4':
      case 'stats':
        await showEmailStats();
        break;
      case '5':
      case 'verify':
        await verifyEmailSetup();
        break;
      case '6':
      case 'exit':
        console.log('👋 Goodbye!');
        rl.close();
        return;
      default:
        console.log('❌ Invalid choice');
    }

    console.log('\n' + '─'.repeat(50) + '\n');
  }
}

async function main() {
  const command = process.argv[2];

  if (!command) {
    await interactiveMode();
    return;
  }

  switch (command) {
    case 'setup':
      await setupEmailSequences();
      break;
    case 'list':
      await listEmailSequences();
      break;
    case 'test':
      await testEmailTemplate();
      break;
    case 'stats':
      await showEmailStats();
      break;
    case 'verify':
      await verifyEmailSetup();
      break;
    default:
      console.log('❌ Unknown command:', command);
      console.log('\nAvailable commands: setup, list, test, stats, verify');
  }

  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  setupEmailSequences,
  listEmailSequences,
  showEmailStats,
  testEmailTemplate,
  verifyEmailSetup
};