class Response {
    constructor(error,status,message,response) {
        this.error=error,
        this.status=status,
        this.message=message,
        this.response=response;
    };
};

module.exports = Response;