const {selectAllProducts} = require('../../../model/products');
const Response = require('../../../classes/response.js');
let rta;

async function getAllProducts(req, res) {
    try {
        let products = await selectAllProducts();

        if (products) {
            
            rta = new Response(false, 200, "Consulta generada exitosamente", products);
            res.status(200).send(rta)
        } else {
            // console.log(products);
            rta = new Response(true, 401, "No hay productos disponibles para mostrar", "");
            res.status(200).send(rta)
        }
    } catch (error) {
        rta = new Response(true, 500, "No fue posible generar la consulta de productos", error);
        res.status(500).send(rta)
    };
};

module.exports = {getAllProducts};