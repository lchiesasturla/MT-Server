const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
    ],
    taskController.createTask
);

router.get('/:id',
    auth,
    taskController.getTasks
)

router.put('/:id',
    auth,
    taskController.updateTask
)

router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router;