// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   role: { type: String, required: true },
//   dateJoined: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Employee', employeeSchema);

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the employee name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
    lowercase: true,
  },
  role: {
    type: String,
    required: [true, 'Please specify the employee role'],
  enum: [
            'Employee',
            'Manager',
            'Admin',
            'HR',
            'Sales Manager',
            'Finance Officer',
            'Team Lead',
            'Developer',
            'Designer',
            'QA Engineer',
            'Support Specialist',
            'Marketing Executive',
            'Product Manager'
        ],
    default: 'Employee',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Employee', employeeSchema);