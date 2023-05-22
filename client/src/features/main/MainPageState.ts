export interface MainPageState {
    isFolderSelected: boolean
    isEmptyProjects: boolean
    projects: Project[]
    folderPath: string
}

export interface Project {
    name: string
    preview: string
}

export function initMainPageState(folderPath: string): MainPageState {
    return {
        isFolderSelected: folderPath !== "",
        isEmptyProjects: true,
        folderPath: folderPath,
        projects: []
    }
}