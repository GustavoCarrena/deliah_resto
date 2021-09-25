const {selectProductById} = require('../../../model/products');
const {OneDeleteProduct}  = require('../../../model/products');
const Response = require('../../../classes/response.js');

/*Eliminación de productos*/
async function deleteProducts(req, res) {
    try {
        const {product_id} = req.body;
        const selProduct = await selectProductById(product_id);//selecciona el producto de la tabla productos, según id
        const product_name = selProduct[0].product_name
        try {
            await OneDeleteProduct(product_id)//elimina el producto de la tabla productos, según su id
            res.status(200).send(new Response(false, 200, "Plato eliminado exitosamente", `Se ha eliminado el plato '${product_name}' con el id '${product_id}'`))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible eliminar el plato", error))
        }
    } catch (error) {
        res.status(500).send(new Response(true, 500, "No existen platos en la selección", error))
    };
};

module.exports = {deleteProducts};