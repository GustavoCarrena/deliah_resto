const {insertNewProduct} = require('../../../model/products');
const Response = require('../../../classes/response.js');

/*Creación de productos*/
async function productCreate(req, res) {
    try {
        const {product_name,product_description,product_price,product_disponibilty} = req.body;
        let insert = await insertNewProduct([product_name, product_description, product_price, product_disponibilty]);//inserta datos del producto en tabla productos
        res.status(200).send(new Response(false, 200, "Plato creado exitosamente", `Se ha creado el plato ${product_name} con el identificador ${insert[0]}`))
    } catch (error) {
        res.status(500).send(new Response(true, 500, "No fue posible crear el plato", error))
    };
};

module.exports = productCreate;