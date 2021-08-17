
const user = require ('../../modules/index_users.js');
const products = require('../../modules/index_products.js');

/* RUTAS PRINCIPALES */
module.exports = function (app) {
    app.use('/user',user);
    app.use('/products',products)
}; //va a app.js