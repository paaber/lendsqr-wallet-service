import HttpStatusCodes from "./HttpStatusCodes";

export class HttpError extends Error {
    statusCode: number;
    constructor (message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

/**
 * Error for incorrect or unacceptable values
 */
export class ValueError extends Error {
    constructor (message: string) {
        super(message);
    }
}

/**
 * Error for a resource that is non-existent
 */
export class NotFoundError extends HttpError {
    constructor (message: string) {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
}


export class NotAllowedError extends Error {
    constructor (message: string) {
        super(message);
    }
}

export class ConflictError extends HttpError {
    constructor (message: string) {
        super(message, HttpStatusCodes.CONFLICT);
    }
}
