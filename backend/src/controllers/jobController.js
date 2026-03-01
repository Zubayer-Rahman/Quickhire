const db = require('../config/db');

// GET /api/jobs
const getAllJobs = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    let query = 'SELECT * FROM jobs WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (title LIKE ? OR company LIKE ? OR description LIKE ?)';
      const like = `%${search}%`;
      params.push(like, like, like);
    }
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await db.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// POST /api/jobs
const createJob = async (req, res) => {
  try {
    const { title, company, location, category, description } = req.body;
    const [result] = await db.execute(
      'INSERT INTO jobs (title, company, location, category, description) VALUES (?, ?, ?, ?, ?)',
      [title, company, location, category, description]
    );
    const [newJob] = await db.execute('SELECT * FROM jobs WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: newJob[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id FROM jobs WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    await db.execute('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { getAllJobs, getJobById, createJob, deleteJob };