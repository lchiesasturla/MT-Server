const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController')
const auth = require('../middleware/auth');
// Login
// api/auth

router.post('/', 
    authController.login
);

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;