"use strict";

var mongoose = require('mongoose');

var UsersSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  registro: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model('User', UsersSchema);