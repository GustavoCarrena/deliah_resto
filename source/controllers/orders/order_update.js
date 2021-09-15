const {updateOrder,updateOrderSatus,orderStatusDescription} = require('../../../model/orders');
const Response = require('../../../classes/response.js');


/*======= CONFIRMAR ORDEN CON EL PAGO DEL USUARIO =======*/

async function orderUpdate(req,res) {
    
    const {order_id,user_id,payment_code} = req.body;

    try {

        await updateOrder([payment_code,3,order_id]);
        res.status(200).send(new Response(false, 200, "Orden confirmada", ""))

    } catch (error) {
        res.status(500).send(new Response(true, 500, "No fue posible", error))
    }
}

/*======= CAMBIAR STATUS DE ORDEN =======*/

async function orderStatusUpdate(req,res) {

    const {order_status_code,order_id} = req.body;

    try {

        await updateOrderSatus([order_status_code,order_id]);
        
        try {
            let status = await orderStatusDescription ([order_status_code])
            res.status(200).send(new Response(false, 200, "Orden actualizada", status[0]))
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No fue posible actualizar la orden", error))
        }
        
    } catch (error) {
        res.status(500).send(new Response(true, 500, "No fue posible cambiar el estado de la orden", error))
    }
}


module.exports = {orderUpdate,orderStatusUpdate};