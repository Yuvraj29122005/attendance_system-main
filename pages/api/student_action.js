import { getStudents, addStudent, deleteStudent } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { action, ...data } = req.body || {};

  try {
    if (action === 'list') {
      const branch = data.branch || 'AIML';
      const students = await getStudents(branch);
      return res.json({ success: true, students });
    }

    if (action === 'add') {
      const roll = parseInt(data.roll_no);
      const name = (data.name || '').trim();
      const branch = data.branch;

      if (!roll || !name || !['AIML', 'AIDS'].includes(branch)) {
        return res.json({ success: false, message: 'Invalid data' });
      }

      const result = await addStudent(roll, name, branch);
      return res.json(result);
    }

    if (action === 'delete') {
      const id = parseInt(data.id);
      const result = await deleteStudent(id);
      return res.json(result);
    }

    return res.json({ success: false, message: 'Unknown action' });
  } catch (error) {
    console.error('Student action error:', error);
    return res.json({ success: false, message: error.message || 'Operation failed' });
  }
}
