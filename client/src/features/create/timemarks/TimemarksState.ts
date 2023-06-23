import {TimemarkUi} from "./TimemarkUi";
import {ErrorModel} from "../../../domain/errors/ErrorConverter";

export interface TimemarksState {
    error: ErrorModel | null
    isLoading: boolean
    timemarks: TimemarkUi[]
}

export function initTimemarksState(): TimemarksState {
    return {
        error: null,
        isLoading: true,
        timemarks: []
    }
}