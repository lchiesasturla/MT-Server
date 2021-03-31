"use strict";

var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creado: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model('Project', ProjectSchema);