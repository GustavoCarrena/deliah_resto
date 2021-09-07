const express = require ('express');
const routes = require('./source/routes/index.routes.js');
const app = express();
// const expressJwt = require('express-jwt');
require('dotenv').config();
const PORT = process.env.PORT;
const globalMiddlewares = require('./midllewares/global_middlewares/global_middlewares');
const { userLogin } = require('./source/controllers/user/userLogin.js');

//GLOBAL MIDDLEWARES
globalMiddlewares(app);

//ROUTES
routes(app);

//PORT LISTEN
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));

// prueba TRES del pull - GIT

