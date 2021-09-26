const {updateOrder,updateOrderSatus,orderStatusDescription} = require('../../../model/orders');
const Response = require('../../../classes/response.js');

/*Orden a estado confirmada*/
async function orderUpdate(req,res) {
    const {order_id,payment_code} = req.body;
    try {
        await updateOrder([3,payment_code,order_id]);//"Harcodea" el status "confirmada" actualiza el estado del pago en tabla ordenes
        res.status(200).send(new Response(false, 200, "Orden confirmada", ""))
    } catch (error) {
        res.status(500).send(new Response(true, 500, "Error del servidor", ""))
    };
}

/*Actualiza el estado de la orden*/
async function orderStatusUpdate(req,res) {
    const {order_status_code,order_id} = req.body;
    try {
        await updateOrderSatus([order_status_code,order_id]);//actualiza estado
        try {
            let status = await orderStatusDescription ([order_status_code])//busca la descripción del estado actualizado para devolver en la respuesta
            res.status(200).send(new Response(false, 200, "Orden actualizada", status[0]))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error del servidor", ""))
        }
    } catch (error) {
        res.status(500).send(new Response(true, 500, "Error del servidor", ""))
    }
}


module.exports = {orderUpdate,orderStatusUpdate};