"use strict";

var express = require('express');

var usersController = require('../controllers/usersController');

var router = express.Router();

var _require = require('express-validator'),
    check = _require.check; //Crea un usuario
// api/users


router.post('/', [check('nombre', 'El nombre es obligatorio').not().isEmpty(), check('email', 'Agrega un email valido').isEmail(), check('password', 'El password debe ser minimo de 6 caracteres').isLength({
  min: 6
})], usersController.createUser);
module.exports = router;