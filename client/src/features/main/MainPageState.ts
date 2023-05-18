

export interface MainPageState {
    isFolderSelected: boolean
    folderPath: string
}

export function initMainPageState(folderPath: string): MainPageState {
    return {
        isFolderSelected: folderPath !== "",
        folderPath: folderPath
    }
}