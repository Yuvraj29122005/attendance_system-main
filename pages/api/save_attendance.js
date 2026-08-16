import { saveAttendance } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { date, slots } = req.body || {};
  if (!date || !slots) {
    return res.json({ success: false, message: 'Invalid data' });
  }

  try {
    const result = await saveAttendance(date, slots);
    return res.json(result);
  } catch (error) {
    console.error('Save attendance error:', error);
    return res.json({ success: false, message: error.message || 'Save failed' });
  }
}
