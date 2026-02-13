class ApiError extends Error {
    constructor(
        statusCode,
        message = "Somethinge went Wrong",
        errors = [],
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = statck
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }


    }
}
export { ApiError }