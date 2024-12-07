import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Create person
router.post('/', async (req, res) => {
  try {
    const { name, age, dob, gender, barcodeData } = req.body;
    
    // Validate required fields
    if (!name || !age || !dob || !gender || !barcodeData) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO persons (name, age, dob, gender, barcode_data) VALUES (?, ?, ?, ?, ?)',
      [name, age, dob, gender, barcodeData]
    );
    res.json({ id: result.insertId, success: true });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Error creating person', details: error.message });
  }
});

// Get person by barcode
router.get('/barcode/:barcodeData', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM persons WHERE barcode_data = ?',
      [req.params.barcodeData]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Error fetching person', details: error.message });
  }
});

export default router;