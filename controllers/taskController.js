const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator')

//Crea una nueva tarea

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { proyecto } = req.body;

        const project = await Project.findById(proyecto);
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Verificar el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        const task = new Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.getTasks = async (req, res) => {
    try {
        const proyecto = req.params.id;
        const project = await Project.findById(proyecto);
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Verificar el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        const tasks = await Task.find({ proyecto });
        res.json({tasks});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { nombre, estado } = req.body;

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        const project = await Project.findById(task.proyecto);

        //Verificar el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        const newTask = {};
        if(nombre) newTask.nombre = nombre;
        if(estado.toString() !== "") newTask.estado = estado;
        
        task = await Task.findOneAndUpdate({_id : req.params.id}, newTask, {new: true});
        res.json({task})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { nombre, estado } = req.body;

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        const project = await Project.findById(task.proyecto);

        //Verificar el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        
        task = await Task.findOneAndRemove({_id : req.params.id});
        res.json({msg: 'Tarea eliminada'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}