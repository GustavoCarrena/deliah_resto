const {selectUserAdmin,updateProductById,selectProductById}  = require('../../../model/products');
const Response = require('../../../classes/response.js');
let arrayProduct = [];

const updateProducts = (req, res) => {

    const {product_id,data} = req.body;

    for (let key in data) {
        arrayProduct.push(`${key}='${data[key]}'`)
    };

    async function update() {

        try {
            await updateProductById(product_id, arrayProduct);
            try {
                let selectProduct = await selectProductById(product_id);
                res.status(200).send(new Response(false, 200, "Plato actualizado exitosamente", selectProduct[0]));
            } catch (error) {
                res.status(500).send(new Response(true, 500, "Error de conexion", error));
            }
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No se pudo actualizar el plato", error))
        }
    };
    update();
};



module.exports = {updateProducts};


