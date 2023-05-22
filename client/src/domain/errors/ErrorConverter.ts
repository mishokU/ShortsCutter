export enum ErrorType {
    LOGIN, UNDEFINED,
    NOT_EXISTS
}

export interface ErrorModel {
    message: string
    type: ErrorType
}

export class ErrorConverter {

    convertTag(tag: string): ErrorModel {
        console.log(tag)
        if (tag === 'expired_access_token') {
            return {
                message: "Please, login again!", type: ErrorType.LOGIN
            }
        } else {
            return {
                message: "Undefined error!", type: ErrorType.UNDEFINED
            }
        }
    }

    convertStatus(status: number): ErrorModel {
        if (status === 409) {
            return {
                message: "Content do not exists!", type: ErrorType.NOT_EXISTS
            }
        } else {
            return {
                message: "Undefined error!", type: ErrorType.UNDEFINED
            }
        }
    }

}