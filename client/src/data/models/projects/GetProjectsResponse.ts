import {FileResponse} from "../files/FilesResponse";

export interface GetProjectsResponse {
    success: boolean
    message: string
    projects: GetProjectResponse[]
}

export interface GetProjectResponse {
    id: number
    projectName: string
    date: string
    timemarks: number
    videoPreview: string
    file: FileResponse | undefined
}