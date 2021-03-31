"use strict";

var Project = require('../models/Project');

var _require = require('express-validator'),
    validationResult = _require.validationResult;

exports.createProject = function _callee(req, res) {
  var errors, project;
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
          try {
            project = new Project(req.body);
            project.creador = req.user.id;
            project.save();
            res.json(project);
          } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getProjects = function _callee2(req, res) {
  var projects;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Project.find({
            creador: req.user.id
          }).sort({
            creado: -1
          }));

        case 3:
          projects = _context2.sent;
          res.json({
            projects: projects
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send('Hubo un error');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateProject = function _callee3(req, res) {
  var errors, nombre, updatedProject, project;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          nombre = req.body.nombre;
          updatedProject = {};

          if (nombre) {
            updatedProject.nombre = nombre;
          }

          _context3.prev = 6;
          _context3.next = 9;
          return regeneratorRuntime.awrap(Project.findById(req.params.id));

        case 9:
          project = _context3.sent;

          if (project) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            msg: 'Proyecto no encontrado'
          }));

        case 12:
          if (!(project.creador.toString() !== req.user.id)) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            msg: 'No autorizado'
          }));

        case 14:
          _context3.next = 16;
          return regeneratorRuntime.awrap(Project.findOneAndUpdate({
            _id: req.params.id
          }, {
            $set: updatedProject
          }, {
            "new": true
          }));

        case 16:
          project = _context3.sent;
          res.json({
            project: project
          });
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](6);
          console.log(_context3.t0);
          res.status(500).send('Hubo un error en el servidor');

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 20]]);
};

exports.deleteProject = function _callee4(req, res) {
  var errors, project;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Project.findById(req.params.id));

        case 6:
          project = _context4.sent;

          if (project) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: 'Proyecto no encontrado'
          }));

        case 9:
          if (!(project.creador.toString() !== req.user.id)) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(401).json({
            msg: 'No autorizado'
          }));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(Project.findOneAndRemove({
            _id: req.params.id
          }));

        case 13:
          res.json({
            msg: 'Proyecto eliminado'
          });
          res.json({
            project: project
          });
          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](3);
          console.log(_context4.t0);
          res.status(500).send('Hubo un error en el servidor');

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 17]]);
};