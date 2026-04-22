import type { NextApiRequest, NextApiResponse } from 'next';
import { getReplies } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  
  try {
    const replies = await getReplies();
    res.status(200).json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch replies' });
  }
}
