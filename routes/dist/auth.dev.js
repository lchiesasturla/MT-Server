"use strict";

var express = require('express');

var router = express.Router();

var _require = require('express-validator'),
    check = _require.check;

var authController = require('../controllers/authController'); // Login
// api/auth


router.post('/', [check('email', 'Agrega un email valido').isEmail(), check('password', 'El password debe ser minimo de 6 caracteres').isLength({
  min: 6
})], authController.login);
module.exports = router;