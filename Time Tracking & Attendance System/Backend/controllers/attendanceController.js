const Attendance = require('../models/attendance');

// Create attendance record
const createAttendance = async (req, res) => {
  try {
    const { employeeId, checkInTime, checkOutTime, date } = req.body;

    if (!employeeId || !checkInTime) {
      return res.status(400).json({ message: 'Please provide employeeId and checkInTime' });
    }

    const attendance = await Attendance.create({
      employee: employeeId, // Map correctly to schema field
      checkInTime,
      checkOutTime,
      date
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({})
      .populate('employee', 'name email role'); // match schema ref
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update attendance record
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance record deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
};
