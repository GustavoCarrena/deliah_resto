const Response = require('../../classes/response');
const {selectUserEmail} = require('../../model/users');
let rta;

/* = Control de campos vacíos, inexistencia de campos obligatorios, usuario administrador = */

const userDataValidate = (req, res, next) => {
    const {email,fullname,phone,adress,user_password,user_admin} = req.body;
    if (email != null && fullname != null && phone != null && adress != null && user_password != null && user_admin != null ) {
        if (email.length > 0 && fullname.length > 0 && phone.length > 0 && adress.length > 0 && user_password.length > 0) {
            if (user_admin === 1 || user_admin === 0 && user_admin !== "" ) {
                next();
            } else {rta = new Response(true, 400, "Los únicos valores admitidos para user_admin son 0 ó 1", "");res.status(400).send(rta)};
        } else {rta = new Response(true, 400, "Todos los campos deben contener datos", "");res.status(400).send(rta)};
    } else {rta = new Response(true, 400, "Se requieren todos los campos", "");res.status(400).send(rta)};
};

/* ======= Control de duplicidad de usuarios en el registro =================== */

const userEmailValidate = (req, res, next) => {
    const {email} = req.body;
    selectUserEmail(email)
    .then(function(userEmail){
        if (email == userEmail[0].email) {
            rta = new Response(true, 401, "El email ya se encuentra registrado", "");res.status(401).send(rta);
        } else {
            next();
        }
    });
};

/* ======== Exportación de funcionalidades a modules/index_users ============= */

module.exports = {userDataValidate,userEmailValidate};