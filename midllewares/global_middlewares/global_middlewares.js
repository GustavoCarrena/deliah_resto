const express = require('express');
const swagger_Ui = require('swagger-ui-express');
const swagger_Document = require('../../documentation/delilah_resto.json');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const expressJwt = require('express-jwt');
require('dotenv').config();
const JWTKEY = process.env.JWTKEY; 

let reqLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutos
    max: 120, // 120 peticiones
    message: "Límite máximo de peticiones excedido"
});

/*Cuando no se encuentra el token*/
const serverErrorToken = (err, req, res, next) => { 
    if (!err) { 
        next();    
    }
    if (err.name === "UnauthorizedError") { 
        return res.status(401).send({error: "No se encontró un token de autorización"});
    }//lo devuelve el express-jwt
    res.status(500).send({error: "Se ha producido un error inesperado"});
}

module.exports = function (app) {
    app.use(helmet());
    app.use(express.static('publica'));
    app.use(express.json());
    app.disable('x-powered-by');
    app.use('/delilah_documentation', swagger_Ui.serve, swagger_Ui.setup(swagger_Document));
    app.use(express.json({limit: '200kb'}));
    app.use(reqLimit);
    app.use(expressJwt({
            secret: JWTKEY,
            algorithms: ['sha1', 'RS256', 'HS256']
        }).unless({
            path: ["/user/userCreate", "/user/userLogin"]
    }));
    app.use(serverErrorToken);
};