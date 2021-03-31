"use strict";

var express = require('express');

var router = express.Router();

var projectController = require('../controllers/projectController');

var auth = require('../middleware/auth');

var _require = require('express-validator'),
    check = _require.check; // api/projects


router.post('/', auth, [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()], projectController.createProject);
router.get('/', auth, projectController.getProjects);
router.put('/:id', auth, [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()], projectController.updateProject);
router["delete"]('/:id', auth, projectController.deleteProject);
module.exports = router;