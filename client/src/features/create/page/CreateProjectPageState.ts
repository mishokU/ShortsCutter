import {DocumentEntityUi} from "../ui/DocumentEntityUi";
import {ErrorModel} from "../../../domain/errors/ErrorConverter";
import {FileUi} from "../ui/FileUi";

export interface CreateProjectPageState {
    path: string
    items: DocumentEntityUi[]
    isLoading: boolean
    isEmpty: boolean
    error: ErrorModel | null
    showContentHandler: ShowContentHandler | null
    selectedFile: FileUi | null
    projectName: string
    projectId: number | null
}

export interface ShowContentHandler {
    selectedFile: string
    setIsShowContentClick: (isVisible: boolean) => void
    isShowContentModalVisible: boolean
}

export function initCreateProjectPageState(projectId: string | undefined): CreateProjectPageState {
    return {
        path: "Dropbox",
        items: [],
        isEmpty: false,
        isLoading: true,
        projectName: "",
        showContentHandler: null,
        error: null,
        selectedFile: null,
        projectId: Number(projectId)
    }
}