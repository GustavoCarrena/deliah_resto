const {insertNewUser} = require('../../../model/users.js');
const Response = require('../../../classes/response.js');

/*
 * Inserta datos nuevo usuario en tabla de usuarios
 * Devuelve el Id del nuevo usuario
 */

async function userCreate(req, res) {
    try {
        const {email,fullname,phone,adress,user_password,user_admin} = req.body;
        const id = await insertNewUser([email, fullname, phone, adress, user_password, user_admin]);
        res.status(201).send(new Response(false, 201, "Usuario creado exitosamente", `Id del Usuario: ${id[0]}`));
    } catch (error) {
        res.status(500).send(new Response(true, 500, "No fue posible crear el usuario", error));
    };
};

module.exports = {userCreate};