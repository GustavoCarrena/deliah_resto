const Response = require('../../classes/response');
const {selectUserEmail} = require('../../model/users');
let rta;

/* ==== Control de campos vacíos, inexistencia de campos obligatorios, usuario administrador ==== */

const userDataValidate = (req, res, next) => {
    const {email,fullname,phone,adress,user_password,user_admin} = req.body;
    if (email != null && fullname != null && phone != null && adress != null && user_password != null && user_admin != null) {
        if (email.length > 0 && fullname.length > 0 && phone.length > 0 && adress.length > 0 && user_password.length > 0) {
            if (user_admin === 1 || user_admin === 0 && user_admin !== "") {
                next();
            } else {
                rta = new Response(true, 400, "Los únicos valores admitidos para user_admin son 0 ó 1", "");
                res.status(400).send(rta);
            };
        } else {
            rta = new Response(true, 400, "Todos los campos deben contener datos", "");
            res.status(400).send(rta);
        };
    } else {
        rta = new Response(true, 400, "Se requieren todos los campos", "");
        res.status(400).send(rta);
    };
};

/* ======= Control de duplicidad de usuarios en el registro =================== */

const userEmailValidate = (req, res, next) => {
    
    const {email} = req.body;

   selectUserEmail(email)
    .then(userEmail => {

        if (userEmail.length == 0 ) {
            next();
        } else {
            rta = new Response(true, 401, `El email (${userEmail[0].email}) ya se encuentra registrado`, "");
            res.status(401).send(rta);
        }
    })
    .catch( (error) => {
    rta = new Response(true, 500, "No fue posible generar el usuario", error);
    res.status(500).send(rta)
    });
};




// async function userEmailValidate(req, res, next) {
//     try {
//         const {email} = req.body;
//         let userEmail = await selectUserEmail(email);
//         if (email !== userEmail[0].email) {
//             next()
//             console.log("despues de next" + "  " + userEmail[0].email);
//         } else {
//             rta = new Response(true, 401, `El email ${userEmail[0].email} ya se encuentra registrado`, "");
//             res.status(409).send(rta);
           
//         }
//     } catch (error) {
//          console.log('entro por catch');
//         res.status(500).send({error});
//     };
// };

/* ==== Control de campos vacíos Login ==== */

const userDataLoginValidate = (req, res, next) => {
    const {email,user_password} = req.body;
    if (email != null && user_password != null) {
        if (email.length > 0 && user_password.length > 0) {
            next();
        };
    } else {
        rta = new Response(true, 400, "Se requieren todos los campos", "");
        res.status(400).send(rta);
    };
};

/* ======== Exportación de funcionalidades a modules/index_users ============= */

module.exports = {
    userDataValidate,
    userEmailValidate,
    userDataLoginValidate
};