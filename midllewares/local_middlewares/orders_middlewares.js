const {selectProductIfExist} = require('../../model/products');
const {selectUserId} = require('../../model/users');
const Response = require('../../classes/response');
let rta;

const validateOrderProductData = async (req, res, next) => {
    
    let prodErr = false;
    let orderProductsArray = [];
    let {orderProducts} = req.body;
    
    for (let i = 0; i < orderProducts.length; i++) {
        try {
            let selectProduct = await selectProductIfExist(orderProducts[i].product_id);
            if (selectProduct.length === 0) {
                prodErr = true;
                orderProductsArray.push(`product_id: ${orderProducts[i].product_id}`)
            };
        } catch (error) {
            rta = new Response(true, 500, "No se pudo procesar la orden", error);
            res.status(500).send(rta);
        };
    }
    if( prodErr == true) {
        rta = new Response(true, 404, "Los siguientes Id de poductos solicitados son inexistentes o no están disponibles", orderProductsArray);
        res.status(404).send(rta);
    } else {
        next();
    };
}

const validateOrderData = (req, res, next) => {
    let orderError = false;
    let productsArray = [];
    const {order_header,orderProducts} = req.body;
    const {user_id,order_adress} = order_header
    
    if (order_header == null || orderProducts == null) {
        orderError = true;
    } else {
        productsArray = orderProducts;

        if (user_id == null || order_adress == null || user_id.length <= 0 || order_adress.length <= 0) {
            orderError = true;
        }
        
        for (let i = 0; i < productsArray.length; i++) {

            if (productsArray[i].product_id == null || productsArray[i].product_quantity == null || typeof (productsArray[i].product_id) != 'number' || typeof (productsArray[i].product_quantity) != 'number') {
                orderError = true;
                break;
            }
        }
    }

    if (!orderError) {
        next();
    } else {
        rta = new Response(true, 400, "Los campos deben contener datos válidos", "");
        res.status(400).send(rta);
    }
}


const userIdValidate = (req, res, next) => {

    const {order_header} = req.body;

    selectUserId(order_header.user_id)
        .then(id => {
            if (id.length == 0) {
                rta = new Response(true, 401, `El usuario no se encuentra registrado`, "");
                res.status(401).send(rta);
            } else {
                next();
            }
        })
        .catch((error) => {
            rta = new Response(true, 500, "No fue posible validar el Id del usuario", error);
            res.status(500).send(rta)
        });
};

module.exports = {validateOrderProductData,validateOrderData,userIdValidate};





