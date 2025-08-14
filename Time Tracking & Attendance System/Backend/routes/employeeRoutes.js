const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// Assuming you have an auth middleware for protecting routes

// Route for creating an employee and getting all employees
router.route('/')
  .post( createEmployee)
  .get( getAllEmployees);

// Route for updating and deleting a specific employee
router.route('/:id')
  .put( updateEmployee)
  .delete( deleteEmployee);

module.exports = router;