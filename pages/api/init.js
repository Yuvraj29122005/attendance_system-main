import { initDb } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await initDb();
    res.status(200).json(result);
  } catch (error) {
    console.error('Init error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
