const {selectUserAdmin,updateProductById,selectProductById}  = require('../../../model/products');
const Response = require('../../../classes/response.js');
let rta;
let arrayProduct = [];

const updateProducts = (req, res) => {

    // let {email} = req.body;

    let {email,product_id,data} = req.body;

    for (let key in data) {
        arrayProduct.push(`${key}='${data[key]}'`)
    };

    async function update() {

        try {
            await updateProductById(product_id, arrayProduct);
            try {
                let selectProduct = await selectProductById(product_id);
                rta = new Response(false, 200, "Plato actualizado exitosamente", selectProduct[0]);
                res.status(200).send(rta);
            } catch (error) {
                rta = new Response(true, 500, "Error de conexion", error);
                res.status(500).send(rta);
            }
        } catch (error) {
            rta = new Response(true, 500, "No se pudo actualizar el plato", error);
            res.status(500).send(rta)
        }
    };
    update();
};



module.exports = {updateProducts};


