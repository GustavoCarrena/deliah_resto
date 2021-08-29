const {insertNewOrder,insertInOrderTable,orderSummary,orderSummaryTotal,updateOrderPrice} = require('../../../model/orders');
const Response = require('../../../classes/response.js');


/*========== Devuelve objeto con array de los productos de la orden y array de total de la orden  ======================*/
async function totalPriceResponse(arrayProducts,id) {
    let dataProductObject = new Object();
    dataProductObject.dataArrayProduct= arrayProducts;
    dataProductObject.totalOrder = await orderSummaryTotal(id)
    return dataProductObject;
}

async function orderCreate(req,res) {
    
    let rta;
    
    try {
        
        let order_id;
        let {order_header,orderProducts} = req.body;
    
        const insertOrder = await insertNewOrder([order_header.user_id, 1, 1, order_header.order_adress]);
        order_id = insertOrder[0]; //id + cantidad de inserciones (POSICION CERO PORQUE QUIERO SOLO EL ID)
    
        for (let i = 0; i < orderProducts.length; i++) {
            try {
                await insertInOrderTable([order_id, orderProducts[i].product_id, orderProducts[i].product_quantity]);
            } catch (error) {
                rta = new Response(true, 500, "No se puede crear la orden", error);
                res.status(500).send(rta);
            }
        }
        try {
            let orderTableJoin = await orderSummary(order_id) //join con total por producto y numero de orden
            let totalOrderPrice = await totalPriceResponse(orderTableJoin,order_id) // funcion que devuelve objeto con detalle de la orden
            let total_or = parseInt (totalOrderPrice.totalOrder[0].total_orden); //total de la orden. Extraigo number porque la base toma formato int
            await updateOrderPrice([total_or,order_id]) //actualiza tabla orden en el campo total por cada orden confirmada
            rta = new Response(false, 200, "Orden creada exitosamente", totalOrderPrice);
            res.status(200).send(rta);
        } catch (error) {
            rta = new Response(true, 500, "No se puede crear la orden", error);
            res.status(500).send(rta);
        }
    } catch (error) {
        rta = new Response(true, 500, "No se puede crear la orden", error); 
        res.status(500).send(rta)
    }
}

module.exports = {orderCreate};