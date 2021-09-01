const {selectDataLogin,selectUserIdByEmail} = require('../../../model/users');
const Response = require('../../../classes/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWTKEY = process.env.JWTKEY; 
let rta;

async function userLogin(req, res) {
    try {
        const {email,user_password} = req.body;
        const response = await selectDataLogin([email, user_password]);
        
        if (response.length == 0) {
            rta = new Response(false, 403, "Email o Password incorrectos", "");
            res.status(403).send(rta)
        } else {
            const token = jwt.sign({email: email,user_password: user_password},
            JWTKEY, {expiresIn: '1h'}, {algorithm: 'RS256'});
            const selectId =  await selectUserIdByEmail (email)
            rta = new Response(false, 200, "Usuario logueado exitosamente", {"ID Usuario": selectId[0].user_id, "Token":  token});
            res.status(200).send(rta)
        }
    } catch (error) {
        rta = new Response(true, 500, "No fue posible loguearse", error);
        res.status(500).send(rta)
    };
};

module.exports = {userLogin}; //exporta a modules/index_users


