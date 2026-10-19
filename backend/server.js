const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS so your frontend HTML page can call the API[cite: 3]
app.use(express.json()); // Parse incoming JSON requests

// ==========================================
// REST API ENDPOINTS FOR TIMETABLE
// ==========================================

// 1. GET /api/timetable -> List all records[cite: 3]
app.get('/api/timetable', (req, res) => {
  const query = 'SELECT * FROM timetable';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 2. GET /api/timetable/:id -> Get one record by ID[cite: 3]
app.get('/api/timetable/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM timetable WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(results[0]);
  });
});

// 3. POST /api/timetable -> Create a new record[cite: 3]
app.post('/api/timetable', (req, res) => {
  const { course_code, course_name } = req.body;

  if (!course_code) {
    return res.status(400).json({ error: 'course_code is required' });
  }

  const query = 'INSERT INTO timetable (course_code, course_name) VALUES (?, ?)';
  db.query(query, [course_code, course_name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Record created successfully',
      id: results.insertId,
      course_code,
      course_name
    });
  });
});

// 4. PUT /api/timetable/:id -> Update a record[cite: 3]
app.put('/api/timetable/:id', (req, res) => {
  const { id } = req.params;
  const { course_code, course_name } = req.body;

  if (!course_code) {
    return res.status(400).json({ error: 'course_code is required' });
  }

  const query = 'UPDATE timetable SET course_code = ?, course_name = ? WHERE id = ?';
  db.query(query, [course_code, course_name, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record updated successfully' });
  });
});

// 5. DELETE /api/timetable/:id -> Delete a record[cite: 3]
app.delete('/api/timetable/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM timetable WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});