const sequelize = require('../database_conection/conection.js');

const insertNewUser =  (newUserData) => {
    return sequelize.query("INSERT INTO users (email,fullname,phone,adress,user_password,user_admin) VALUES(?,?,?,?,MD5(?),?)", { 
        type: sequelize.QueryTypes.INSERT,
        replacements:newUserData,
    })
};


module.exports = {insertNewUser}; //a controllers/user
