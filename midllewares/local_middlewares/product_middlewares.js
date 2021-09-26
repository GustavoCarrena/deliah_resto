const Response = require('../../classes/response');
const {selectProductById} = require('../../model/products');
const {selectUserAdmin} = require('../../model/users');

/*Validacición de privilegios de administrador*/
const userAdminValidate = async (req,res,next) => {
    try {
        const {user_id} = req.body;
        const response = await selectUserAdmin(user_id)
        if (response[0].user_admin === 1) {
            next()
        }else{
            res.status(401).send(new Response(true, 401, ` El usuario debe ser administrador para efectuar la operación`, ""));
        }        
    } catch (error) {
        res.status(500).send(new Response(true, 500, 'Error del servidor', error));
    };
};

/*Valida la recepción de los campos requeridos y que los mismos no estén vacios*/
const productDataValidate = async (req,res,next) => {
    const {email,product_name,product_description,product_price,product_disponibilty} = req.body;
    if (email != null && product_name != null && product_description != null && product_price != null && product_disponibilty != null ) {
        if (email.length > 0 && product_name.length > 0 && product_description.length > 0 &&  product_disponibilty === 0 || product_disponibilty === 1) {
            next()
        } else {
            res.status(400).send(new Response(true, 400, "Todos los campos deben contener datos", ""));
        };
    } else {
        res.status(400).send(new Response(true, 400, "Se requieren todos los campos", ""));
    };
};

/*Valida que el producto, a través del Id, exista en la tabla productos*/
async function getProductId(req, res, next) {
    try {
        let {product_id} = req.body;
        let selById = await selectProductById(product_id);
        let selId = selById[0].product_id;
        if (selId == product_id && selId) {
            next()
        };
    } catch (error) {
        let {product_id} = req.body;
        res.status(401).send(new Response(true, 401, "No fue posible actualizar el producto", `El Id '${product_id}' ingresado no existe o no se ingresó el dato requerido, por favor seleccione un id válido para realizar la eliminación del producto`));
    };
};

module.exports = {userAdminValidate,getProductId,productDataValidate};

