const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { submitApplication } = require('../controllers/applicationController');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const applicationValidation = [
  body('job_id').notEmpty().withMessage('Job ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('resume_link').isURL().withMessage('Resume link must be a valid URL'),
  body('cover_note').optional(),
];

router.post('/', applicationValidation, handleValidation, submitApplication);

module.exports = router;