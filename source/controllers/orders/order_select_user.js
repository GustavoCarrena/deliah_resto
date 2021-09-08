const {getOrderById,getOrderFullData,orderSummary,getOrderByUser,getOrderDescription} = require('../../../model/orders');
const Response = require('../../../classes/response.js');


async function getOrderByUserId(req, res) {
    let arrayOrders = [];
    const {user_id} = req.body;
   
    try {
        const SelectOrderByUser = await getOrderByUser(user_id)
        
        for (let i = 0; i < SelectOrderByUser.length; i++) {
            try {
                const codeDescription = await getOrderDescription([SelectOrderByUser[i].order_status_code, SelectOrderByUser[i].payment_code])
                let order = new Object();
                order.order_id = SelectOrderByUser[i].order_id;
                order.address = SelectOrderByUser[i].order_adress;
                order.orderStatus = codeDescription[0].order_status_description;
                order.paymentDescription = codeDescription[0].payment_description;
                order.arrayProducts = await orderSummary(SelectOrderByUser[i].order_id)
                totalOrder = 0;
                for (let k = 0; k < order.arrayProducts.length; k++) {
                    
                    totalOrder += order.arrayProducts[k].product_quantity * order.arrayProducts[k].product_price
                }
               console.log(`totalOrder = ${totalOrder}`);
                order.totalOrder = totalOrder
                arrayOrders.push(order);
               

            } catch (error) {
                res.status(500).send(new Response(true, 500, "No fue posible realizar la operación", error))
            }
        }
        res.status(200).send(new Response(false, 200, `Órdenes en curso del usuario: ${SelectOrderByUser[0].fullname }`, arrayOrders))
    } catch (error) {
        // console.log(error);
        res.status(500).send(new Response(true, 500, "No fue posible realizar la operación", error))
    }
}

module.exports = {getOrderByUserId};