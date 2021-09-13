const {selectDataLogin,selectUserIdByEmail} = require('../../../model/users');
const Response = require('../../../classes/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWTKEY = process.env.JWTKEY; 

async function userLogin(req, res) {
    try {
        const {email,user_password} = req.body;
        const response = await selectDataLogin([email, user_password]);
        if (response.length == 0) {
            res.status(403).send(new Response(false, 403, "Email o Password incorrectos", ""))
        } else {
            const token = jwt.sign({email: email,user_password: user_password},
            JWTKEY, {expiresIn: '1h'}, {algorithm: 'RS256'});
            const selectId =  await selectUserIdByEmail (email)
            res.status(200).send(new Response(false, 200, "Usuario logueado exitosamente", {"ID Usuario": selectId[0].user_id, "Token":  token}))
        }
    } catch (error) {
        res.status(401).send(new Response(true, 500, "No fue posible loguearse", error))
    };
};

module.exports = {userLogin}; //exporta a modules/index_users


