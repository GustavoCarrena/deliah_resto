const {updateOrder,updateOrderSatus,orderStatusDescription} = require('../../../model/orders');
const Response = require('../../../classes/response.js');


/*======= CONFIRMAR ORDEN CON EL PAGO DEL USUARIO =======*/

async function orderUpdate(req,res) {
    
    let rta;
    const {order_id,user_id,payment_code} = req.body;

    try {

        await updateOrder([payment_code,3,order_id]);
        rta = new Response(false, 200, "Orden confirmada", ""); 
        res.status(200).send(rta)

    } catch (error) {
        rta = new Response(true, 500, "No fue posible", error); 
        res.status(500).send(rta)
    }
}

/*======= CAMBIAR STATUS DE ORDEN =======*/

async function orderStatusUpdate(req,res) {
    
    let rta;
    const {order_status_code,order_id} = req.body;

    try {

        await updateOrderSatus([order_status_code,order_id]);
        
        try {
            let status = await orderStatusDescription ([order_status_code])
            rta = new Response(false, 200, "Orden actualizada", status[0]);
            res.status(200).send(rta)
        } catch (error) {
            rta = new Response(true, 400, "No fue posible actualizar la orden", error); 
            res.status(400).send(rta)
        }
        
    } catch (error) {
        rta = new Response(true, 500, "No fue posible cambiar el estado de la orden", error); 
        res.status(500).send(rta)
    }
}

module.exports = {orderUpdate,orderStatusUpdate};