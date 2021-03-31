const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {check} = require('express-validator');

//Crea un usuario
// api/users

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ]
    ,
    usersController.createUser
);

module.exports = router;