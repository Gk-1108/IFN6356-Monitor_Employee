const express = require('express');
const {
  createLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave
} = require('../controllers/leaveController');

const router = express.Router();

router.post('/', createLeave);
router.get('/', getAllLeaves);
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);

module.exports = router;
