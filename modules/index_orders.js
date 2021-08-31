const express = require('express');
const {orderCreate} = require('../source/controllers/orders/order_create');
const {validateOrderProductData,validateOrderData,userIdValidate,confirmOrderDataValidate} = require('../midllewares/local_middlewares/orders_middlewares');
const {orderUpdate,orderStatusUpdate} = require('../source/controllers/orders/order_update');
const router = express.Router();


router.post('/orderCreate',validateOrderProductData,validateOrderData,userIdValidate, orderCreate);
router.put('/orderConfirm',confirmOrderDataValidate,orderUpdate);
router.put('/orderStatus',orderStatusUpdate);

module.exports = router; //app.js