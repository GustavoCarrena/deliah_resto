class Response {
    constructor(error,status,mensaje,response) {
        this.error=error,
        this.status=status,
        this.mensaje=mensaje,
        this.response=response;
    };
};

module.exports = Response;