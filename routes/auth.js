const express = require('express');
const validator = require('../utils/validators');

const router = new express.Router();

router.post('/signup', (req, res) => {
  const validationResult = validator.validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});

router.post('/login', (req, res) => {
  const validationResult = validator.validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return res.status(200).end();
});


module.exports = router;