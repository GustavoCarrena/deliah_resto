const express = require('express');
const {orderCreate} = require('../source/controllers/orders/order_create');
const {validateOrderProductData,validateOrderData,userIdValidate} = require('../midllewares/local_middlewares/orders_middlewares');
const {orderUpdate} = require('../source/controllers/orders/order_update');
const router = express.Router();


router.post('/orderCreate',validateOrderProductData,validateOrderData,userIdValidate, orderCreate);
router.put('/orderConfirm',orderUpdate)


module.exports = router; //app.js