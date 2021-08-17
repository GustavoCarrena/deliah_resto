const sequelize = require('../database_conection/conection.js');

const selectUserAdmin = (superUser) => {
    return sequelize.query('SELECT user_admin FROM users WHERE email = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [superUser]
    });
};

const insertNewProduct = (newProduct) => {
    return sequelize.query("INSERT INTO products (product_name,product_description,product_price,product_disponibilty) VALUES(?,?,?,?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: newProduct
    });
};

module.exports = {insertNewProduct,selectUserAdmin};