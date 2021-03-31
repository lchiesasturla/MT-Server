"use strict";

var express = require('express');

var connectDB = require('./config/db');

var app = express();
connectDB(); //Habilita express.json

app.use(express.json({
  extended: true
}));
var PORT = process.env.PORT || 4000; //Importar rutas

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.listen(PORT, function () {
  console.log("Server running at ".concat(PORT));
});