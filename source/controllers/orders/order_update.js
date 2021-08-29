const {updateOrder} = require('../../../model/orders');
const Response = require('../../../classes/response.js');

async function orderUpdate(req,res) {
    
    let rta;
    const {order_id,user_id,payment_code} = req.body

    try {

        let putOrder = await updateOrder([payment_code,3,order_id]);
        console.log(`updateOrder = ${putOrder}`);
        rta = new Response(false, 200, "Orden confirmada", ""); 
        res.status(200).send(rta)

    } catch (error) {
        rta = new Response(true, 500, "No fue posible", error); 
        res.status(500).send(rta)
    }
}

module.exports = {orderUpdate};