const Project = require('../models/Project');
const {validationResult} = require('express-validator')

exports.createProject = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const project = new Project(req.body);

        project.creador = req.user.id;
        project.save();
        res.json(project)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getProjects = async (req,res) => {
    try {
        const projects = await Project.find({ creador: req.user.id }).sort({creado: -1});
        res.json({projects});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateProject = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {nombre} = req.body;
    const updatedProject = {};

    if(nombre){
        updatedProject.nombre = nombre;
    }

    try {
        // revisar el ID

        let project = await Project.findById(req.params.id);

        // Si el proyecto existe o no
        if(!project){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
        //Verificar el creador del proyecto
        if (project.creador.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Actualizar

        project = await Project.findOneAndUpdate({_id: req.params.id}, {$set: updatedProject}, {new: true});

        res.json({project});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}

exports.deleteProject = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        let project = await Project.findById(req.params.id);

        // Si el proyecto existe o no
        if(!project){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
        //Verificar el creador del proyecto
        if (project.creador.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Actualizar

        await Project.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Proyecto eliminado'});

        res.json({project});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}