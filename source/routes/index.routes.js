
const user = require ('../../modules/index_users.js');

/* RUTAS PRINCIPALES */
module.exports = function (app) {
    app.use('/user',user);
}; //va a app.js