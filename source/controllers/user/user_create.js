const {insertNewUser} = require('../../../model/users.js');
const Response = require('../../../classes/response.js');
let rta;

async function userCreate (req,res) {
    try {
        const {email,fullname,phone,adress,user_password,user_admin} = req.body;
        insertNewUser([email, fullname, phone, adress, user_password, user_admin]);
        rta = new Response(false, 200, "Usuario creado exitosamente", "");
        res.status(200).send(rta)
    } catch (error) {
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta)
    }
};

// const createNewUser = (req, res) => {
//     let rta;
//     const { email, fullname, phone, user_address, user_password, user_admin} = req.body; 

//     insertNewUser([email, fullname, phone, user_address, user_password, user_admin]).then( ()=>{
//            rta = new Response(false, 200, "usuario creado exitosamente", "");
//            res.status(200).send(rta)
//         }).catch((error) => {
//            //validateError(error)
//            rta = new Response(true, 500, "No fue posible crear el usuario", error);
//            res.status(500).send(rta);
//        });  
// }


module.exports = {userCreate};