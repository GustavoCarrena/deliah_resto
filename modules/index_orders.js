const express = require('express');
const {orderCreate} = require('../source/controllers/orders/order_create');
const {validateOrderProductData,validateOrderData,userIdValidate,confirmOrderDataValidate,orderStatusDataValidate} = require('../midllewares/local_middlewares/orders_middlewares');
const {orderUpdate,orderStatusUpdate} = require('../source/controllers/orders/order_update');
const {orderStatusCancel} = require('../source/controllers/orders/order_cancel');
const router = express.Router();


router.post('/orderCreate',validateOrderProductData,validateOrderData,userIdValidate, orderCreate);
router.put('/orderConfirm',confirmOrderDataValidate,orderUpdate);
router.put('/orderStatus',orderStatusDataValidate,orderStatusUpdate);
router.put('/orderCancelStatus',orderStatusCancel);


module.exports = router; //app.js