const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {

    //Revisa si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }
           
        user = new User(req.body);
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(password, salt);
        await user.save();

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
        res.status(400).send('Hubo un error');
    }

}