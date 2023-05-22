import {ErrorModel} from "../../../../domain/errors/ErrorConverter";

export enum ContentType {
    image,
    video,
    file
}

export interface ShowContentState {
    isLoading: boolean
    errorModel: ErrorModel | null
    data: string | null
    type: string
    contentType: ContentType | null
}

export function initShowContentState(): ShowContentState {
    return {
        isLoading: true,
        errorModel: null,
        type: "",
        data: null,
        contentType: null
    }
}