import type { NextApiRequest, NextApiResponse } from 'next';
import { getEmailMetrics, getTemplatePerformance } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  
  try {
    const metrics = await getEmailMetrics();
    const templates = await getTemplatePerformance();
    
    const data = metrics[0] || { total_sent: 0, opened: 0, replied: 0 };
    const openRate = data.total_sent > 0 ? ((data.opened / data.total_sent) * 100).toFixed(1) : '0';
    const replyRate = data.total_sent > 0 ? ((data.replied / data.total_sent) * 100).toFixed(1) : '0';
    
    res.status(200).json({
      sent: data.total_sent,
      opened: data.opened,
      replied: data.replied,
      openRate: parseFloat(openRate),
      replyRate: parseFloat(replyRate),
      templates
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
}
