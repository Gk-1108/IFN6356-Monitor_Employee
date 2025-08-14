const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, default: Date.now },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
