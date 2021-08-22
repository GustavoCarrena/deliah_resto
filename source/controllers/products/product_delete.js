const {selectProductById} = require('../../../model/products');
const {OneDeleteProduct}  = require('../../../model/products');
const Response = require('../../../classes/response.js');
let rta;

async function deleteProducts(req, res) {
    try {
        let {product_id} = req.body;
        let selProduct = await selectProductById(product_id);
        let product_name = selProduct[0].product_name
        try {
            await OneDeleteProduct(product_id)
            rta = new Response(false, 200, "Plato eliminado exitosamente", `Se ha eliminado el plato '${product_name}' con el id '${product_id}'`);
            res.status(200).send(rta)
        } catch (error) {
            rta = new Response(true, 500, "No fue posible eliminar el plato", error);
            res.status(500).send(rta)
        }
    } catch (error) {
        rta = new Response(true, 500, "No existen platos en la selección", error);
        res.status(500).send(rta)
    };
};

module.exports = {deleteProducts};