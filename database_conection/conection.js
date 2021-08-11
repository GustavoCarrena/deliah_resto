const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:3306/deliah_db'
const sequelize = new Sequelize(path,{operatorsAliases: 0 });
sequelize.authenticate()
.then(()=>{console.log('Conectado...');})
.catch(err=>{console.log('Error de conexion:',err);});

module.exports = sequelize;