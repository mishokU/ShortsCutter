

export interface GetTimemarksResponse {
    success: boolean
    message: string
    timemarks: GetTimemarkResponse[]
}

export interface GetTimemarkResponse {
    id: number
    project_id: number
    start_time: number
    end_time: number
}