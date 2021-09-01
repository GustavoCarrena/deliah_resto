const {updateOrderSatus} = require('../../../model/orders');
const Response = require('../../../classes/response.js');

async function orderStatusCancel(req,res) {
    let rta;
    const {order_id} = req.body;
    const orderStatusCancel = 2;
    try {

        await updateOrderSatus([orderStatusCancel,order_id]);
        rta = new Response(false, 200, "Orden cancelada", "");
        res.status(200).send(rta)
    } catch (error) {
        rta = new Response(true, 500, "No fue posible cambiar el estado de la orden", error); 
        res.status(500).send(rta)
    }
};

module.exports = {orderStatusCancel}