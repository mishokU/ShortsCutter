

export interface DownloadState {
    steps: DownloadStep[]
}

export interface DownloadStep {
    name: string
    progress: number
}

export function initDownloadState(): DownloadState {
    return {
        steps: []
    }
}