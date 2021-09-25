const {cancelOrderSatus} = require('../../../model/orders');
const Response = require('../../../classes/response.js');

/*Cancelación de orden*/
async function orderStatusCancel(req,res) {
    const {order_id} = req.body;
    try {
        await cancelOrderSatus([order_id]); //update código de status de tabla ordenes 
        res.status(200).send(new Response(false, 200, `Orden ${order_id} cancelada correctamemte`, ""))
    } catch (error) {
        res.status(500).send(new Response(true, 500, "No fue posible cambiar el estado de la orden", error))
    };
};

module.exports = {orderStatusCancel}