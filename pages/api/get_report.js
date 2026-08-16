import { getAttendanceReport } from '../../lib/db';

export default async function handler(req, res) {
  const date = req.query.date || '';
  if (!date) {
    return res.json({ success: false, message: 'Date required' });
  }

  try {
    const records = await getAttendanceReport(date);
    return res.json({ success: true, records });
  } catch (error) {
    console.error('Get report error:', error);
    return res.json({ success: false, message: error.message || 'Failed to fetch report' });
  }
}
