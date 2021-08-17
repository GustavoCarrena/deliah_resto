const Sequelize = require('sequelize');
require('dotenv').config();
const DB_PORT = process.env.DB_PORT; 
const DB_DATABASE = process.env.DB_DATABASE; 
const path = `mysql://root@localhost:${DB_PORT}/${DB_DATABASE}`;
const sequelize = new Sequelize(path,{operatorsAliases: 0 });
sequelize.authenticate()
.then(()=>{console.log('Conectado...');})
.catch(err=>{console.log('Error de conexion:',err);});

module.exports = sequelize;