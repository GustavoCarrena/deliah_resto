const {login} = require('ruta a model/user donde va a estar el select de pass del user de la base de datos')
const response = require('clase con la respuesta Class')
const jwt = require('utilidad jsonwebtoken')
const jwtkey = "clave"

/**
 * 1. plantear acá funcion loginUser (asincrona)
 *  1.1. requerir user/password del body
 *  1.2 invocar funccion planteada en "model" y pasar como parametro user-password
 *  1.3 que no venga vacío el campo
 *  1.4 que exista el usuario (username == users[0].username / password == users[0].password)
 *  1.5 si existe usuario, const token = jwt.sign +  jwtkey expiresIn/algorithm: 'RS256'
 *  1.6 respuesta logueo correcto
 *  1.7 exportar funcion loginUser
 * 
 * 2. requerir en modules loginUser
 *  2.1. router.post ("/login"middleware de limiter,loginUser)
 * 
 * 3. const login(user) en model (select)
 * 
 * 4. middleware ratelimit + funcion validar usuario (usuario no vacio)
 * 
 * 
 * 
 * 
 */


