const express = require ('express');
const routes = require('./source/routes/index.routes.js');
const app = express();
const port = 3000; 
app.use(express.json());


//MIDDLEWARES GLOBALES
// middlewaresGlobales(app) //se pasa app como parametro porque es una funcion con funcionalidases que viene del archivo mid globales

//MIDDLEWARES ERRORES
// app.use(notFound,serverError)

//ROUTES
routes(app);


//PORT LISTEN
app.listen(port,()=>console.log(`Server listening on port ${port}`));

