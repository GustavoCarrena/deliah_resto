
const express = require('express');
const router = express.Router();
const {userCreate} = require('../source/controllers/user/user_create.js');
const {userLogin} = require('../source/controllers/user/userLogin');
const {userDataValidate,userEmailValidate} = require('../midllewares/local_middlewares/users_middlewares');
const{userDataLoginValidate} = require ('../midllewares/local_middlewares/users_middlewares')

router.post('/userCreate',userDataValidate,userEmailValidate,userCreate); 
router.post('/userLogin',userDataLoginValidate,userLogin);

module.exports = router;

