const sequelize = require('../database_conection/conection.js');


const insertNewUser = (newUserData) => {
    return sequelize.query("INSERT INTO users (email,fullname,phone,adress,user_password,user_admin) VALUES(?,?,?,?,?,?)", {
        type: sequelize.QueryTypes.INSERT,
        replacements: newUserData
    });
};

const selectUserEmail = (email) => {
    return sequelize.query('SELECT email,fullname FROM users WHERE email = ?;', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [email]
    });
};

const selectDataLogin = (dataLogin) => {
    return sequelize.query('SELECT email,user_password FROM users WHERE email = ? AND user_password = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: dataLogin
    });
};

module.exports = {
    insertNewUser,
    selectUserEmail,
    selectDataLogin,
}; //a controllers/user_create