import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { action, params } = req.body;
  const SSH_KEY = '/Users/g/.ssh/claw-automation.pem';
  const EC2_USER = 'ubuntu';
  const EC2_HOST = '16.59.210.149';
  
  const sshCmd = (cmd: string) => `ssh -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} "cd ~/openclaw && ${cmd}"`;
  
  try {
    let result;
    switch (action) {
      case 'send_emails':
        const count = params.count || 15;
        const { stdout } = await execAsync(sshCmd(`python3 email_scheduler.py ${count}`));
        result = { success: true, output: stdout };
        break;
      case 'follow_up':
        const days = params.days || 7;
        const { stdout: out2 } = await execAsync(sshCmd(`python3 email_scheduler.py --followup`));
        result = { success: true, output: out2 };
        break;
      default:
        result = { success: false, error: 'Unknown action' };
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
