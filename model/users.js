const sequelize = require('../database_conection/conection.js');


const insertNewUser = (newUserData) => {
    return sequelize.query("INSERT INTO users (email,fullname,phone,adress,user_password,user_admin) VALUES(?,?,?,?,MD5(?),?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: newUserData
    });
};

const selectUserEmail = (e) => {
    return sequelize.query('SELECT email FROM users WHERE email = ?;', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [e]
    });
};

const selectDataLogin = (dataLogin) => {
    return sequelize.query('SELECT email,user_password FROM users WHERE email = ? AND user_password = MD5(?)', {
        type: sequelize.QueryTypes.SELECT,
        replacements: dataLogin
    });
};

module.exports = {
    insertNewUser,
    selectUserEmail,
    selectDataLogin,
}; //a controllers/user_create