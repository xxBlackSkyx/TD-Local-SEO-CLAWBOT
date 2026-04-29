import type { NextApiRequest, NextApiResponse } from 'next';

const EC2 = 'http://16.59.210.149';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const r = await fetch(`${EC2}/api/stats`, { signal: AbortSignal.timeout(8000) });
    const data = await r.json();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(data);
  } catch (e: any) {
    res.status(503).json({ error: 'EC2 unreachable', detail: e.message });
  }
}
