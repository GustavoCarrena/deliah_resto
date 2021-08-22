const sequelize = require('../database_conection/conection.js');

/*====== Condición para CRUD de productos ==> user_admin = 1 ======*/

const selectUserAdmin = (superUser) => {
    return sequelize.query('SELECT user_admin FROM users WHERE email = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [superUser]
    });
};

/*====== Alta ======*/

const insertNewProduct = (newProduct) => {
    return sequelize.query("INSERT INTO products (product_name, product_description, product_price, product_disponibilty) VALUES(?,?,?,?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: newProduct
    });
};

// /*====== Selección ======*/

const selectAllProducts = (products) => {
    return sequelize.query('SELECT * FROM products WHERE product_disponibilty = 1 ', {
            type: sequelize.QueryTypes.SELECT,
            replacements: products
    });
};

const selectProductById = (idP) => {
    return sequelize.query('SELECT * FROM products WHERE product_id = ?;', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [idP]
    });
};

// /*====== Eliminación ======*/

const OneDeleteProduct = ( id ) => {
    return sequelize.query('DELETE FROM products WHERE product_id = ?;', {
            type: sequelize.QueryTypes.DELETE,
            replacements: [id]
    });
};

// /*====== Actualización ======*/

const updateProductById =  (product_id, data) => {
    return sequelize.query(`UPDATE products SET ${data} WHERE product_id = ?`, {
        type: sequelize.QueryTypes.PUT,
        replacements: [product_id]
    });
};


module.exports = {
    insertNewProduct,
    selectUserAdmin,
    selectAllProducts,
    selectProductById,
    OneDeleteProduct,
    updateProductById
};