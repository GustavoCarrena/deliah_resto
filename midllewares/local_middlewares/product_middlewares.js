const Response = require('../../classes/response');
const {selectUserAdmin} = require('../../model/products')

const userAdminValidate = async (req,res,next) => {
    
    try {
        let rta;
        let admin;
        const {email} = req.body;
        const response = await selectUserAdmin(email)
        admin = response[0].user_admin
        console.log(`Response selectUserAdmin: ${JSON.stringify(response)}`);
        console.log(`user_admin: ${ JSON.stringify(admin)}`);
        if (admin === 1 ) {
                    next();
                } else {rta = new Response(true, 409, ` El usuario ${JSON.stringify(email)} debe ser administrador para efectuar la operación`, "");
                        res.status(409).send(rta);
                    };
    } catch (error) {
                        rta = new Response(true, 500, 'No se pudo instertar el plato', "");
                        res.status(409).send(error);
    }
    

};


module.exports = {userAdminValidate};

