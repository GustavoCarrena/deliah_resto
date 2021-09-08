const express = require('express');
const {orderCreate} = require('../source/controllers/orders/order_create');
const {validateOrderProductData,validateOrderData,userIdValidate,confirmOrderDataValidate,userAdmin,orderStatusData,orderIn,orderStatusValidate,orderDataValidate} = require('../midllewares/local_middlewares/orders_middlewares');
const {orderUpdate,orderStatusUpdate} = require('../source/controllers/orders/order_update');
const {orderStatusCancel} = require('../source/controllers/orders/order_cancel');
const {getOrderByUserId} = require('../source/controllers/orders/order_select_user');
const router = express.Router();


router.post('/orderCreate',validateOrderProductData,validateOrderData,userIdValidate, orderCreate);
router.put('/orderConfirm',confirmOrderDataValidate,orderUpdate);
router.put('/orderStatus',userAdmin,orderStatusData,orderIn,orderStatusUpdate);
router.put('/orderCancelStatus',orderDataValidate,orderStatusValidate,orderStatusCancel);
router.get('/selectOrder',/*orderDataValidate,*/getOrderByUserId);

module.exports = router; //app.js