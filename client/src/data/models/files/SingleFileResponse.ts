
export interface SingleFileResponse {
    success: boolean
    status: number
    id: string
    fileBinary: string
    client_modified: string
    server_modified: string
    fileLink: string
    type: string
    is_downloadable: boolean
}