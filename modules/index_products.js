const express = require('express');
const router = express.Router();
const productCreate = require('../source/controllers/products/product_create');
const {userAdminValidate,getProductId,productDataValidate} = require('../midllewares/local_middlewares/product_middlewares');
const {getAllProducts} = require('../source/controllers/products/product_select');
const {deleteProducts} = require('../source/controllers/products/product_delete');
const {updateProducts} = require('../source/controllers/products/product_update');

router.post('/productCreate',userAdminValidate,productDataValidate,productCreate);
router.get('/getAllProducts',getAllProducts);
router.delete('/deleteProduct',userAdminValidate,getProductId,deleteProducts);
router.put('/updateProduct',userAdminValidate,getProductId,updateProducts);

module.exports = router;