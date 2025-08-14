const mongoose = require('mongoose');
const Leave = require('../models/leave');
const Employee = require('../models/employee');

// Create leave request
const createLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, reason, status } = req.body;

    if (!employeeId || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: 'Please provide all required leave details' });
    }

    // ✅ Validate employee exists
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    const employeeExists = await Employee.findById(employeeId);
    if (!employeeExists) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const leave = await Leave.create({
      employee: mongoose.Types.ObjectId(employeeId), // ensure proper ObjectId
      startDate,
      endDate,
      reason,
      status: status || 'Pending'
    });

    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all leave requests
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employee', 'name email role') // ✅ should now return actual object
      .lean();

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update leave request
const updateLeave = async (req, res) => {
  try {
    if (req.body.employeeId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID format' });
      }

      const employeeExists = await Employee.findById(req.body.employeeId);
      if (!employeeExists) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      req.body.employee = mongoose.Types.ObjectId(req.body.employeeId);
      delete req.body.employeeId;
    }

    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete leave request
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.json({ message: 'Leave deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave
};
