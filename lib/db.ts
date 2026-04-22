import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const SSH_KEY = '/Users/g/.ssh/claw-automation.pem';
const EC2_USER = 'ubuntu';
const EC2_HOST = '16.59.210.149';
const DB_PATH = '/home/ubuntu/.openclaw/leads.db';

const sshCommand = (cmd: string) => 
  `ssh -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} "cd ~/openclaw && ${cmd}"`;

export async function queryDatabase(query: string) {
  const pythonCode = `python3 << 'PYEOF'
import sqlite3
import json

conn = sqlite3.connect('${DB_PATH}')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()
cursor.execute("""${query}""")
rows = cursor.fetchall()
result = [dict(row) for row in rows]
print(json.dumps(result))
conn.close()
PYEOF`;

  try {
    const { stdout } = await execAsync(sshCommand(pythonCode));
    return JSON.parse(stdout.trim());
  } catch (error: any) {
    console.error('Database query error:', error.message);
    return [];
  }
}

export async function getEmailMetrics() {
  return queryDatabase(`
    SELECT 
      COUNT(*) as total_sent,
      SUM(CASE WHEN status = 'opened' THEN 1 ELSE 0 END) as opened,
      SUM(CASE WHEN replied_at IS NOT NULL THEN 1 ELSE 0 END) as replied
    FROM email_tracking
  `);
}

export async function getLeads() {
  return queryDatabase(`
    SELECT id, name, email, industry, location, email_sent_count, email_opened, email_replied
    FROM leads
    ORDER BY id DESC
  `);
}

export async function getCampaignHistory() {
  return queryDatabase(`
    SELECT 
      lead_id, recipient_email, template_used, subject, sent_at, status
    FROM email_tracking
    ORDER BY sent_at DESC
    LIMIT 50
  `);
}

export async function getReplies() {
  return queryDatabase(`
    SELECT 
      r.*, l.name as lead_name
    FROM replies r
    LEFT JOIN leads l ON r.lead_id = l.id
    WHERE r.is_spam = 0
    ORDER BY r.received_at DESC
  `);
}

export async function getTemplatePerformance() {
  return queryDatabase(`
    SELECT 
      template_used,
      COUNT(*) as sent,
      SUM(CASE WHEN status = 'opened' THEN 1 ELSE 0 END) as opened,
      SUM(CASE WHEN replied_at IS NOT NULL THEN 1 ELSE 0 END) as replied
    FROM email_tracking
    GROUP BY template_used
    ORDER BY opened DESC
  `);
}
