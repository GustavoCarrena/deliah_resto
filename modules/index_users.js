
const express = require('express');
const router = express.Router();
const {userCreate} = require('../source/controllers/user/user_create.js');
const {userLogin} = require('../source/controllers/user/userLogin');
const {userDataValidate,userEmailValidate} = require('../midllewares/local_middlewares/users_middlewares');
const{userDataLoginValidate} = require ('../midllewares/local_middlewares/users_middlewares')

//subrutas de usuarios

router.post('/userCreate',userDataValidate,userEmailValidate,userCreate); 
router.get('/userLogin',userDataLoginValidate,userLogin);

//cuado llega a loginUsuario, devuelvo respuesta, el usuario se entera el token(loginusuario.js)
// usuario.post('/registro',verificarUsuarioNuevo,crearUsuario);
// usuario.get('confirm',confirmarUsuario);
// usuario.put('delete',eliminarUsuario); //borrado lógico

module.exports = router; //app.js

