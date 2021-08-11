class Response {
    constructor(error,status,mensaje,respuesta) {
        this.error=error,
        this.status=status,
        this.mensaje=mensaje,
        this.respuesta=respuesta;
    };
};

module.exports = Response;