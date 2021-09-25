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

const selectUserId = (UserId) => {
    return sequelize.query('SELECT user_id FROM users WHERE user_id = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [UserId]
    });
};

const selectUserIdByEmail = (UserId) => {
    return sequelize.query('SELECT user_id FROM users WHERE email = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [UserId]
    });
};

const selectUserAdmin = (UserId) => {
    return sequelize.query('SELECT user_admin FROM users WHERE user_id = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [UserId]
    });
};

const selectEmailById = (id) => {
    return sequelize.query('SELECT email FROM users WHERE user_id = ?;', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id]
    });
};


module.exports = {
    insertNewUser,
    selectUserEmail,
    selectDataLogin,
    selectUserId,
    selectUserIdByEmail,
    selectUserAdmin,
    selectEmailById
};