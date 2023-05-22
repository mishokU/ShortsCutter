

export interface FilesResponse {
    success: boolean
    files: FileResponse[]
    tag: string
}

export interface FileResponse {
    '.tag': string
    name: string
    success: boolean
    status: number
    path_lower: string
    path_display: string
    id: string
    fileBinary: string
    client_modified: string
    server_modified: string
    is_downloadable: boolean
}