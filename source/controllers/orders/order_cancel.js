const {cancelOrderSatus} = require('../../../model/orders');
const Response = require('../../../classes/response.js');

async function orderStatusCancel(req,res) {
    let rta;
    const {order_id} = req.body;
    try {
        await cancelOrderSatus([order_id]);
        rta = new Response(false, 200, `Orden ${order_id} cancelada correctamemte`, "");
        res.status(200).send(rta)
    } catch (error) {
        rta = new Response(true, 500, "No fue posible cambiar el estado de la orden", error); 
        res.status(500).send(rta)
    }
};

module.exports = {orderStatusCancel}