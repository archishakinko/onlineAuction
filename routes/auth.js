const express = require('express');
const validator = require('../utils/validators');
const auth = require('../utils/authcheck');
const config = require('../config');
const Sequelize = require('sequelize');
const dbcontext = require('../context/db')(Sequelize, (process.env.DEV!=null)?config.postgres:config.mysql);

const router = new express.Router();

router.post('/signup', (req, res, next) => {
  const validationResult = validator.validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  auth.register(req, res, next, dbcontext);
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
  auth.auth(req,res, dbcontext);
});

router.use(auth.saveUserLocal);


module.exports = router;