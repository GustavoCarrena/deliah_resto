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

module.exports = function (app) {
    app.use(helmet());
    app.use(express.static('publica'));
    app.use(express.json());
    app.disable('x-powered-by');
    app.use(express.json({limit: '200kb'}));
    app.use(reqLimit);

    app.use(expressJwt({
            secret: JWTKEY,
            algorithms: ['sha1', 'RS256', 'HS256']
        }).unless({
            path: ["/user/userCreate", "/user/userLogin"]
    }));
};

