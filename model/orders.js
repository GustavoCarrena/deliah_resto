const sequelize = require('../database_conection/conection.js');

const insertNewOrder = (newOrder) => {
    return sequelize.query("INSERT INTO orders (user_id, payment_code, order_status_code, order_adress) VALUES(?,?,?,?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: newOrder
    });
};

const insertInOrderTable = (product) => {
    return sequelize.query("INSERT INTO order_products (order_id, product_id, product_quantity) VALUES(?,?,?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: product
    });
};

const orderSummary = (id) => {
    return sequelize.query(`SELECT p.product_id,p.product_name, o.product_quantity, p.product_price,(o.product_quantity * p.product_price) AS "precio total por producto"
    FROM order_products o 
    INNER JOIN products p 
    ON (o.product_id = p.product_id)
    WHERE o.order_id = ?;`, {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id],
    })
};

const orderSummaryTotal = (id) => {
    return sequelize.query(`SELECT SUM(o.product_quantity * p.product_price) AS total_orden
    FROM order_products o
    INNER JOIN products p
    ON (o.product_id = p.product_id)
    WHERE o.order_id = ?;`, {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id]
    })
};

const updateOrderPrice = (orderId) => {
    return sequelize.query("UPDATE orders SET total = ? WHERE order_id = ?", {
        type: sequelize.QueryTypes.UPDATE,
        replacements: orderId,
    });
}

const updateOrder = (order) => {
    return sequelize.query("UPDATE orders SET order_status_code = ?, payment_code = ? WHERE order_id = ?", {
        type: sequelize.QueryTypes.UPDATE,
        replacements: order,
    });
}

const getOrderById = (userid, orderid) => {
    return sequelize.query("SELECT user_id, order_id FROM orders WHERE order_id = ? AND user_id = ?", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [userid, orderid],
    })
}

const getOrderByUserId = (userid, orderid) => {
    return sequelize.query("SELECT user_id, order_id FROM orders WHERE user_id = ?", {
        type: sequelize.QueryTypes.SELECT,
        replacements: [userid, orderid],
    })
}

const updateOrderSatus = (order) => {
    return sequelize.query("UPDATE orders SET order_status_code = ? WHERE order_id = ?", {
        type: sequelize.QueryTypes.UPDATE,
        replacements: order,
    });
}

const cancelOrderSatus = (order) => {
    return sequelize.query("UPDATE orders SET order_status_code = 2 WHERE order_id = ?", {
        type: sequelize.QueryTypes.UPDATE,
        replacements: order,
    });
}

const orderStatusDescription = (id) => {
    return sequelize.query('SELECT * FROM order_status WHERE order_status_code = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id]
    })
}

const getOrderFullData = (id) => {
    return sequelize.query('SELECT * FROM orders WHERE order_id = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id]
    })
}

const getOrderByUser = (id) => {
    const orderCancelStatus = 2;
    const orderFinishStatus = 6;
    return sequelize.query(`SELECT u.fullname, o.order_adress, o.order_id, o.order_status_code, o.payment_code 
    FROM users u
    INNER JOIN orders o 
    ON (u.user_id = o.user_id) 
    WHERE u.user_id = ? and o.order_status_code != ${orderCancelStatus} and o.order_status_code != ${orderFinishStatus};`, {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id]
    })
}

const getOrderDescription = (dataCodes) => {
    return sequelize.query(`SELECT o.order_status_code, o.payment_code, os.order_status_description, pm.payment_description 
    FROM orders o
    INNER JOIN order_status os 
    ON (o.order_status_code = os.order_status_code) 
    INNER JOIN payment_methods pm 
    ON (o.payment_code = pm.payment_code) 
    WHERE o.order_status_code = ? and o.payment_code = ?`, {
        type: sequelize.QueryTypes.SELECT,
        replacements: dataCodes
    })
}

const getUserAdminByEmail = (email) => {
    return sequelize.query('SELECT user_admin FROM users WHERE email = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [email]
    })
}

const deleteOrderProduct = (id) => {
    return sequelize.query('DELETE FROM order_products WHERE order_id = ?', {
        type: sequelize.QueryTypes.DELETE,
        replacements: [id]
    });
};

const deleteOrders = (id) => {
    return sequelize.query('DELETE FROM orders WHERE order_id = ?',{
        type: sequelize.QueryTypes.DELETE,
        replacements: [id]
    });
};

module.exports = {
    insertNewOrder,
    insertInOrderTable,
    orderSummary,
    orderSummaryTotal,
    updateOrder,
    updateOrderPrice,
    getOrderById,
    updateOrderSatus,
    orderStatusDescription,
    getOrderFullData,
    cancelOrderSatus,
    getOrderByUser,
    getOrderDescription,
    getOrderByUserId,
    getUserAdminByEmail,
    deleteOrderProduct,
    deleteOrders
};