const Response = require('../../classes/response');
const {selectUserAdmin,selectProductById} = require('../../model/products');


const userAdminValidate = async (req,res,next) => {
    try {
        const {email} = req.body;
        const response = await selectUserAdmin(email)
        if (response[0].user_admin === 1) {
            next()
        }else{
            res.status(409).send(new Response(true, 409, ` El usuario ${JSON.stringify(email)} debe ser administrador para efectuar la operación`, ""));
        }        
    } catch (error) {
        res.status(500).send(new Response(true, 500, 'No se pudo instertar el plato', error));
    };
};

async function getProductId(req, res,next) {
    try {
        let {product_id} = req.body;
        let selById = await selectProductById(product_id);
        let selId = selById[0].product_id;
        if (selId == product_id && selId) {next()};
    } catch (error) {
        let {product_id} = req.body;
        res.status(401).send(new Response(true, 401, "No fue posible eliminar el producto" , `El Id '${product_id}' ingresado no existe o no se ingresó el dato requerido, por favor seleccione un id válido para realizar la eliminación del producto`));
    };
};

module.exports = {userAdminValidate,getProductId};

