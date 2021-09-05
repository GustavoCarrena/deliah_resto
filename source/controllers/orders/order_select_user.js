const {getOrderById,getOrderFullData,orderSummary,getOrderByUser} = require('../../../model/orders');
const Response = require('../../../classes/response.js');


async function getOrderByUserId(req,res) {
    
let objOrder = new Object();
let arrayOrders=[];

    const {user_id} = req.body;
    try {
        // const getOrder = await getOrderFullData(order_id)
        // const orderSum = await orderSummary(order_id)
       const SelectOrderByUser = await getOrderByUser (user_id)
       
       for (let i = 0; i < SelectOrderByUser.length; i++) {
        objOrder.order_address = SelectOrderByUser[i].order_adress;
        arrayOrders.push(objOrder)
    }
        res.status(200).send(new Response(false, 200, `Órdenes en curso del usuario: ${SelectOrderByUser[0].fullname }`, arrayOrders))
    } catch (error) {
        console.log(error);
        res.status(500).send(new Response(true, 500, "No fue posible realizar la operación", error))
    }
}

module.exports = {getOrderByUserId};