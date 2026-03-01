const db = require('../config/db');

// POST /api/applications
const submitApplication = async (req, res) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    // Check job exists
    const [jobs] = await db.execute('SELECT id FROM jobs WHERE id = ?', [job_id]);
    if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const [result] = await db.execute(
      'INSERT INTO applications (job_id, name, email, resume_link, cover_note) VALUES (?, ?, ?, ?, ?)',
      [job_id, name, email, resume_link, cover_note || '']
    );

    const [newApp] = await db.execute('SELECT * FROM applications WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: newApp[0], message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { submitApplication };