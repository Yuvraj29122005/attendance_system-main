import { getSubjects, addSubject, updateSubject, deleteSubject } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { action, ...data } = req.body || {};

  try {
    if (action === 'list') {
      const subjects = await getSubjects();
      return res.json({ success: true, subjects });
    }

    if (action === 'add') {
      const name = (data.name || '').trim();
      if (!name) {
        return res.json({ success: false, message: 'Name required' });
      }
      const result = await addSubject(name);
      return res.json(result);
    }

    if (action === 'edit') {
      const id = parseInt(data.id || 0);
      const name = (data.name || '').trim();
      if (!id || !name) {
        return res.json({ success: false, message: 'Invalid data' });
      }
      const result = await updateSubject(id, name);
      return res.json(result);
    }

    if (action === 'delete') {
      const id = parseInt(data.id || 0);
      const result = await deleteSubject(id);
      return res.json(result);
    }

    return res.json({ success: false, message: 'Unknown action' });
  } catch (error) {
    console.error('Subject action error:', error);
    return res.json({ success: false, message: error.message || 'Operation failed' });
  }
}
