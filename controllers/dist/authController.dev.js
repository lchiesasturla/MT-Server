"use strict";

var User = require('../models/User');

var bcryptjs = require('bcryptjs');

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var jwt = require('jsonwebtoken');

exports.login = function _callee(req, res) {
  var errors, _req$body, email, password, user, validPass, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context.sent;

          if (user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'El usuario no existe'
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(bcryptjs.compare(password, user.password));

        case 12:
          validPass = _context.sent;

          if (validPass) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'La contraseña es incorrecta'
          }));

        case 15:
          //Crear y firmar el JWT
          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, process.env.SECRET_WORD, {
            expiresIn: 3600
          }, function (error, token) {
            if (error) throw error;
            res.json({
              token: token
            });
          });
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 19]]);
};