const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        const validPass = await bcryptjs.compare(password, user.password);
        if(!validPass){
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }

        //Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET_WORD, {
            expiresIn: 3600
        }, (error, token)=> {
            if(error) throw error;

            res.json({token});
        });
    } catch (error) {
        console.log(error);
    }
}

exports.usuarioAutenticado = async (req,res) => {
    try {
        console.log(req.usuario)
        const usuario = await User.findById(req.user.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}