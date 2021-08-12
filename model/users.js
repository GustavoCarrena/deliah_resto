const sequelize = require('../database_conection/conection.js');

const insertNewUser =  (newUserData) => {
    return sequelize.query("INSERT INTO users (email,fullname,phone,adress,user_password,user_admin) VALUES(?,?,?,?,MD5(?),?)", { 
        type: sequelize.QueryTypes.INSERT, replacements:newUserData});
};

const selectUserEmail = ( email ) => {
    return sequelize.query('SELECT * FROM users WHERE email = ?;', {
            type: sequelize.QueryTypes.SELECT, replacements: [email]});
};

module.exports = {insertNewUser,selectUserEmail}; //a controllers/user_create
