const {deleteOrderProduct,deleteOrders} = require('../../../model/orders');
const Response = require('../../../classes/response.js');

/*Eliminación de una orden*/
async function deleteOrder(req,res) {
    const {order_id} = req.body;
    try {
        await deleteOrderProduct(order_id); 
        await deleteOrders(order_id);
        res.status(200).send(new Response(false, 200, `Orden ${order_id} eliminada correctamemte`, ""));
    } catch (error) {
        res.status(500).send(new Response(true, 500, "Error Interno del Servidor", error))
    };
};

module.exports = {deleteOrder};