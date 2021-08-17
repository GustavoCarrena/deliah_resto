
const express = require('express');
const router = express.Router();
const {userCreate,userLogin} = require('../source/controllers/user/user_create.js');
const {userDataValidate,userEmailValidate,userDataLoginValidate} = require('../midllewares/local_middlewares/users_middlewares');
// const eliminarUsuario = require('/controllers/usuario/eliminarUsuario');
// const crearUsuario = require('/controllers/usuario/crearUsuario');
// const confirmarUsuario = require('/controllers/usuario/confirmarUsuario');
// const loginUsuario = require('/controllers/usuario/loginUsuario');
// const verificarUsuarioNuevo = require('/middlewares/usuario/verificarUsuarioNuevo');
// const validarUsuario = require('/middlewares/usuario/validarUsuario');

//subrutas de usuarios

router.post('/userCreate',userDataValidate,userEmailValidate,userCreate);
router.get('/userLogin',userDataLoginValidate,userLogin);

//cuado llega a loginUsuario, devuelvo respuesta, el usuario se entera el token(loginusuario.js)
// usuario.post('/registro',verificarUsuarioNuevo,crearUsuario);
// usuario.get('confirm',confirmarUsuario);
// usuario.put('delete',eliminarUsuario); //borrado lógico

module.exports = router; //app.js

