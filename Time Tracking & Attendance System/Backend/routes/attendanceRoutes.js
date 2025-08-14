const express = require('express');
const Attendance = require('../models/attendance');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// CREATE Attendance record
router.post('/', async (req, res) => {
  try {
    const { employeeId, checkInTime, checkOutTime, date } = req.body;

    if (!employeeId || !checkInTime) {
      return res.status(400).json({ message: 'Please provide employeeId and checkInTime' });
    }

    const attendance = await Attendance.create({
      employee: employeeId, // <-- fix here
      checkInTime,
      checkOutTime,
      date
    });

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// READ All Attendance records
router.get('/', async (req, res) => {
  try {
    const records = await Attendance.find().populate('employee', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Attendance
router.put('/:id', async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Attendance
router.delete('/:id', protect, async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
