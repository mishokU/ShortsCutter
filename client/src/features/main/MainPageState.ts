import {ErrorModel} from "../../domain/errors/ErrorConverter";

export interface MainPageState {
    isFolderSelected: boolean
    isEmptyProjects: boolean
    projects: Project[]
    folderPath: string
    isLoading: boolean,
    error: ErrorModel | null
}

export interface Project {
    id: number
    name: string
    date: string
    preview: string
}

export function initMainPageState(folderPath: string): MainPageState {
    return {
        isFolderSelected: folderPath !== "",
        isEmptyProjects: false,
        folderPath: folderPath,
        error: null,
        isLoading: true,
        projects: []
    }
}