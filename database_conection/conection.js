const Sequelize = require('sequelize');
require('dotenv').config();
const DB_PORT = process.env.DB_PORT; 
const DB_DATABASE = process.env.DB_DATABASE; 
const HOST_DB =  process.env.HOST_DB;
const USER_DB = process.env.USER_DB;
const path = `mysql://${USER_DB}@${HOST_DB}:${DB_PORT}/${DB_DATABASE}`;
const sequelize = new Sequelize(path,{operatorsAliases: 0 });
sequelize.authenticate()
.then(()=>{
console.log(`========================
=> DB Status: Connect <= 
========================`);})
.catch(err=>{console.log('Error de conexion:',err);});

module.exports = sequelize;