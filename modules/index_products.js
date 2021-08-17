const express = require('express');
const router = express.Router();
const productCreate = require('../source/controllers/products/product_create');
const {userAdminValidate} = require('../midllewares/local_middlewares/product_middlewares');

router.post('/productCreate',userAdminValidate,productCreate);

module.exports = router; //app.js