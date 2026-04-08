-- Email Notifications Schema Extension
-- Add these tables to enable payment reminders and deadline alerts

-- Notification preferences: user settings for email alerts
CREATE TABLE IF NOT EXISTS notification_preferences (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id         TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN (
    'payment_reminder_3_days',
    'payment_reminder_1_day',
    'payment_overdue',
    'monthly_summary',
    'tax_deadline_reminder',
    'receipt_generation_reminder'
  )),
  enabled         BOOLEAN NOT NULL DEFAULT true,
  email_enabled   BOOLEAN NOT NULL DEFAULT true,
  days_before     INTEGER DEFAULT NULL,  -- for deadline reminders, how many days before to send
  time_of_day     TIME DEFAULT '09:00:00', -- when to send daily notifications
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, notification_type)
);

CREATE INDEX IF NOT EXISTS idx_notification_preferences_user ON notification_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_preferences_type ON notification_preferences(notification_type);

-- Scheduled notifications: queue of notifications to be sent
CREATE TABLE IF NOT EXISTS scheduled_notifications (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id         TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  subject         TEXT NOT NULL,
  body_html       TEXT NOT NULL,
  body_text       TEXT,
  scheduled_for   TIMESTAMPTZ NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  related_id      TEXT,  -- ID of related entity (rental_payment.id, tenant.id, etc.)
  related_type    TEXT,  -- Type of related entity ('payment', 'tenant', 'property')
  retry_count     INTEGER NOT NULL DEFAULT 0,
  sent_at         TIMESTAMPTZ,
  failed_at       TIMESTAMPTZ,
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scheduled_notifications_user ON scheduled_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_notifications_status ON scheduled_notifications(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_notifications_scheduled_for ON scheduled_notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_scheduled_notifications_type ON scheduled_notifications(notification_type);

-- Notification history: record of all notifications sent
CREATE TABLE IF NOT EXISTS notification_history (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id         TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  subject         TEXT NOT NULL,
  related_id      TEXT,
  related_type    TEXT,
  resend_message_id TEXT, -- Resend API message ID for tracking
  status          TEXT NOT NULL CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained')),
  sent_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  delivered_at    TIMESTAMPTZ,
  opened_at       TIMESTAMPTZ,
  clicked_at      TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_notification_history_user ON notification_history(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_history_type ON notification_history(notification_type);
CREATE INDEX IF NOT EXISTS idx_notification_history_sent_at ON notification_history(sent_at);
CREATE INDEX IF NOT EXISTS idx_notification_history_resend_id ON notification_history(resend_message_id);