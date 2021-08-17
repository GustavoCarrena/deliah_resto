const {insertNewUser,selectDataLogin} = require('../../../model/users.js');
const Response = require('../../../classes/response.js');
const jwt = require('jsonwebtoken');
let rta;
require('dotenv').config();
const JWTKEY = process.env.JWTKEY; 

async function userCreate(req, res) {
    try {
        const {email,fullname,phone,adress,user_password,user_admin} = req.body;
        await insertNewUser([email, fullname, phone, adress, user_password, user_admin]);
        rta = new Response(false, 200, "Usuario creado exitosamente", "");
        res.status(200).send(rta)
    } catch (error) {
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta)
    };
};

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
            rta = new Response(false, 200, "Usuario logueado exitosamente", token);
            res.status(200).send(rta)
        }
    } catch (error) {
        rta = new Response(true, 500, "No fue posible loguearse", error);
        res.status(500).send(rta)
    };
};

module.exports = {
    userCreate,
    userLogin
}; //exporta a modules/index_users