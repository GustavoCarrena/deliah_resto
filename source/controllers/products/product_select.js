const {selectAllProducts} = require('../../../model/products');
const Response = require('../../../classes/response.js');

/*Consulta de todos los productos disponibles*/
async function getAllProducts(req, res) {
    try {
        let products = await selectAllProducts();//todos los proctuctos disponibles de la tabla productos
        if (products) {
            res.status(200).send(new Response(false, 200, "Consulta generada exitosamente", products))
        } else {
            res.status(200).send(new Response(true, 401, "No hay productos disponibles para mostrar", ""))
        }
    } catch (error) {
        res.status(500).send(new Response(true, 500, "No fue posible generar la consulta de productos", error))
    };
};

module.exports = {getAllProducts};