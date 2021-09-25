const {insertNewOrder,insertInOrderTable,orderSummary,orderSummaryTotal,updateOrderPrice} = require('../../../model/orders');
const Response = require('../../../classes/response.js');

/*Devuelve objeto con array de los productos de la orden y array de total de la orden*/
async function totalPriceResponse(dataArrayProducts, id) {
    return {
        dataArrayProducts,
        totalOrder: await orderSummaryTotal(id)
    };
};

/*Crea la orden*/
async function orderCreate(req,res) {
    try {
        const {order_header,orderProducts} = req.body;
        const insertOrder = await insertNewOrder([order_header.user_id, 1, 1, order_header.order_adress]); //insercion en la tabla ordenes
        const order_id = insertOrder.shift(); 
        for (let i = 0; i < orderProducts.length; i++) {
            try {
                await insertInOrderTable([order_id, orderProducts[i].product_id, orderProducts[i].product_quantity]);//insercion en tabla con codigo de producto, orden y cantidad
            } catch (error) {
                res.status(500).send(new Response(true, 500, "No se puede crear la orden ", error));
            }
        }
        try {
            const orderTableJoin = await orderSummary(order_id) //join con total por producto y numero de orden
            const totalOrderPrice = await totalPriceResponse(orderTableJoin,order_id) // devuelve objeto con detalle de la orden
            const total_or = parseInt (totalOrderPrice.totalOrder[0].total_orden); //total de la orden. Extrae number porque la base toma formato int
            await updateOrderPrice([total_or,order_id]) //actualiza tabla orden en el campo total por cada orden confirmada
            res.status(200).send(new Response(false, 200, "Orden creada exitosamente", totalOrderPrice));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No se puede crear la orden " , error));
        }
    } catch (error) {
        res.status(500).send(new Response(true, 500, "No se puede crear la orden", error))
    };
};

module.exports = {orderCreate};