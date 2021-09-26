const express = require ('express');
const routes = require('./source/routes/index.routes.js');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const globalMiddlewares = require('./midllewares/global_middlewares/global_middlewares');

//GLOBAL MIDDLEWARES
globalMiddlewares(app);

//ROUTES
routes(app);

//PORT LISTEN
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));



