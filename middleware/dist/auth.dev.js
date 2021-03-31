"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Leer el token del header
  var token = req.header('x-auth-token'); // Revisar si no hay token

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token, permiso no valido'
    });
  } // Validar el token


  try {
    var cifrado = jwt.verify(token, process.env.SECRET_WORD);
    req.user = cifrado.user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token no valido'
    });
  }
};