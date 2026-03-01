const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { getAllJobs, getJobById, createJob, deleteJob } = require('../controllers/jobController');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const jobValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', jobValidation, handleValidation, createJob);
router.delete('/:id', deleteJob);

module.exports = router;