const Response = require('../../classes/response');
const {selectUserEmail} = require('../../model/users');
let rta;

/* ==== Control de campos vacíos, inexistencia de campos obligatorios, usuario administrador ==== */

const userDataValidate = (req, res, next) => {
    const {email,fullname,phone,adress,user_password,user_admin} = req.body;
    if (email != null && fullname != null && phone != null && adress != null && user_password != null && user_admin != null ) {
        if (email.length > 0 && fullname.length > 0 && phone.length > 0 && adress.length > 0 && user_password.length > 0) {
            if (user_admin === 1 || user_admin === 0 && user_admin !== "" ) {
                next();
            } else {rta = new Response(true, 400, "Los únicos valores admitidos para user_admin son 0 ó 1", "");
                    res.status(400).send(rta);
                };
        } else {rta = new Response(true, 400, "Todos los campos deben contener datos", "");
                res.status(400).send(rta);
            };
    } else {rta = new Response(true, 400, "Se requieren todos los campos", "");
            res.status(400).send(rta);
        };
};

/* ======= Control de duplicidad de usuarios en el registro =================== */

const userEmailValidate = (req, res, next) => {
    const {email} = req.body;
    selectUserEmail(email)
    .then(function(userEmail){
        if (email == userEmail[0].email) {
            rta = new Response(true, 401, `El email ${userEmail[0].email} ya se encuentra registrado`, "");//identificar el mail y el usuario para la respuesta
            res.status(409).send(rta);
        } else {
            next();
        };
    });
};//falta catch (error 500 - no fueposible crear usurio) //falta requerir ademas de userEmail, el PASSWORD
//crear token tiene que venir de models/crearToken
// incorporar middleware si no viaja email o contraseña
// controllers/usuario/loginUsuario (se exporta a modules)

// const loginUsuario = (req,res) => {
//     try {
//         const {id,fullname,direccion,administrador} = req.infoUsuario;
//         const token = crearToken({id,administrador});
//         res.status(200).send({message: "Autenticación exitosa",token,fullname,direccion});
//     } catch (error) {
//         res.status(500).send({error})
//     }
// }

// module.exports = loginUsuario;

/* ==== Control de campos vacíos Login ==== */

const userDataLoginValidate = (req, res, next) => {
    const {email,user_password} = req.body;
    if (email != null && user_password != null) {
        if (email.length > 0 && user_password.length > 0) {
            next();
        } 
    } else {rta = new Response(true, 400, "Se requieren todos los campos", "");
            res.status(400).send(rta);
        };
};



/* ======== Exportación de funcionalidades a modules/index_users ============= */

module.exports = {userDataValidate,userEmailValidate,userDataLoginValidate};