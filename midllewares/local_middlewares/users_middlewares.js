const Response = require('../../classes/response');
const {selectUserEmail} = require('../../model/users');

/* Control de campos vacíos, inexistencia de campos obligatorios, usuario administrador */
const userDataValidate = (req, res, next) => {
    const {email,fullname,phone,adress,user_password,user_admin} = req.body;
    if (email != null && fullname != null && phone != null && adress != null && user_password != null && user_admin != null) {
        if (email.length > 0 && fullname.length > 0 && phone.length > 0 && adress.length > 0 && user_password.length > 0) {
            if (user_admin === 1 || user_admin === 0 && user_admin !== "") {
                next();
            } else {
                res.status(400).send(new Response(true, 400, "Los únicos valores admitidos para user_admin son 0 ó 1", ""));
            };
        } else {
            res.status(400).send(new Response(true, 400, "Todos los campos deben contener datos", ""));
        };
    } else {
        res.status(400).send(new Response(true, 400, "Se requieren todos los campos", ""));
    };
};

/* Control de duplicidad de usuarios en el registro */
const userEmailValidate = (req, res, next) => {
    const {email} = req.body;
   selectUserEmail(email)
    .then(userEmail => {
        if (userEmail.length == 0 ) {
            next();
        } else {
            res.status(401).send(new Response(true, 401, `El email (${userEmail[0].email}) ya se encuentra registrado`, ""));
        }
    })
    .catch( (error) => {
    res.status(500).send(new Response(true, 500, "No fue posible generar el usuario", error))
    });
};

/* ==== Control de campos vacíos Login ==== */
const userDataLoginValidate = (req, res, next) => {
    const {email,user_password} = req.body;
    if (email != null && user_password != null) {
        if (email.length > 0 && user_password.length > 0) {
            next();
        };
    } else {
        res.status(400).send(new Response(true, 400, "Se requieren todos los campos", ""));
    };
};

module.exports = {
    userDataValidate,
    userEmailValidate,
    userDataLoginValidate
};