const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const expressJwt = require('express-jwt');
require('dotenv').config();
const JWTKEY = process.env.JWTKEY; 

let reqLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutos
    max: 120,
    message: "Límite máximo de peticiones excedido"
});


const serverErrorToken = (err, req, res, next) => { 

    if (!err) { 
        next();    
    }

    console.log(err);

    if (err.name === "UnauthorizedError") { //no se encontró un token (lo devuelve el express-jwt)

        return res.status(401).send({error: "No se encontró un token de autorización"});
    }

    res.status(500).send({error: "Se ha producido un error inesperado"});
}



module.exports = function (app) {
    app.use(helmet());
    app.use(express.static('publica'));
    app.use(express.json());
    app.disable('x-powered-by');
    app.use(express.json({limit: '200kb'}));
    app.use(reqLimit);
    // app.use(serverError);
    app.use(expressJwt({
            secret: JWTKEY,
            algorithms: ['sha1', 'RS256', 'HS256']
        }).unless({
            path: ["/user/userCreate", "/user/userLogin"]
    }));
    app.use(serverErrorToken)
};

