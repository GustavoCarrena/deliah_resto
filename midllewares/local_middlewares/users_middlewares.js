const Response = require('../../classes/response');
let rta;

const userDataValidate = (req, res, next) => {
    const {email,fullname,phone,adress,user_password,user_admin} = req.body;
    if (email != null && fullname != null && phone != null && adress != null && user_password != null && user_admin != null ) {
        if (email.length > 0 && fullname.length > 0 && phone.length > 0 && adress.length > 0 && user_password.length > 0) {
            if (user_admin === 1 || user_admin === 0 && user_admin !== "" ) {
                next();
            } else {rta = new Response(true, 400, "Los únicos valores admitidos para user_admin son 0 ó 1", "");res.status(400).send(rta)}
        } else {rta = new Response(true, 400, "Todos los campos deben contener datos", "");res.status(400).send(rta)}
    } else {rta = new Response(true, 400, "Se requieren todos los campos", "");res.status(400).send(rta)}
};

// const userIdValidate = (req, res, next) => {
//     const {email,fullname} = req.body;

// };

module.exports = {userDataValidate};