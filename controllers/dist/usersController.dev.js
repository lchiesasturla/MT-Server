"use strict";

var User = require('../models/User');

var bcryptjs = require('bcryptjs');

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var jwt = require('jsonwebtoken');

exports.createUser = function _callee(req, res) {
  var errors, _req$body, email, password, user, salt, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //Revisa si hay errores
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

          if (!user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'El usuario ya existe'
          }));

        case 10:
          user = new User(req.body);
          _context.next = 13;
          return regeneratorRuntime.awrap(bcryptjs.genSalt());

        case 13:
          salt = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(bcryptjs.hash(password, salt));

        case 16:
          user.password = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(user.save());

        case 19:
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
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);
          res.status(400).send('Hubo un error');

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 23]]);
};