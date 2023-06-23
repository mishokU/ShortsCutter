import {useCookies} from "react-cookie";
import {useCallback, useEffect, useState} from "react";
import {FileResponse, FilesResponse} from "../../../data/models/files/FilesResponse";
import {DocumentEntityUi, DocumentType} from "../ui/DocumentEntityUi";
import {ErrorConverter} from "../../../domain/errors/ErrorConverter";
import {FileUi} from "../ui/FileUi";
import {FolderUi} from "../ui/FolderUi";
import {CreateProjectPageState, initCreateProjectPageState} from "./CreateProjectPageState";
import {useNavigate} from "react-router-dom";
import {useGetFilesByFolderMutation} from "../../../data/api/dropbox/DropboxFilesApi";
import {ShortsCutterRoutes} from "../../../navigation/ShortsCutterRoutes";
import {
    useDeleteProjectMutation, useGetProjectMutation, useUpdateProjectNameMutation, useUpdateProjectVideoUrlMutation
} from "../../../data/api/shortsCutter/ProjectsApi";
import {debounce} from "@mui/material";
import {GetProjectResponse} from "../../../data/models/projects/GetProjectsResponse";

export default function CreateProjectViewModel(projectId: string | undefined) {

    const [cookie] = useCookies(['token']);

    const [state, setState] = useState<CreateProjectPageState>(initCreateProjectPageState(projectId))

    const [deleteProjectMutation] = useDeleteProjectMutation()
    const [updateVideo] = useUpdateProjectVideoUrlMutation()
    const [updateName] = useUpdateProjectNameMutation()
    const [loadFiles] = useGetFilesByFolderMutation()
    const [loadProject] = useGetProjectMutation()

    const navigate = useNavigate();
    const errorConverter = new ErrorConverter()

    useEffect(() => {
        load("Dropbox")
    }, [])

    async function loadSingleProject(ui: DocumentEntityUi[], path: string) {
        if (projectId !== undefined) {
            await loadProject(Number(projectId)).unwrap()
                .then((project: GetProjectResponse) => {
                    let file = null
                    if (project.file !== undefined) {
                        file = convertFile(project.file)
                    }
                    setState({
                        ...state, isLoading: false, projectName: project.projectName, items: ui, path: path, error: null, selectedFile: file
                    })
                }).catch((error) => {
                    console.log(error)
                    setState({
                        ...state, isLoading: false, isEmpty: false, error: errorConverter.convertTag(error.message)
                    })
                })
        }
    }

    async function load(path: string) {
        await loadFiles({token: cookie.token, folder: path}).unwrap().then((data: FilesResponse) => {
            if (data.success) {
                if (data.files.length > 0) {
                    const ui = data.files.map((item) => {
                        if (item[".tag"] === 'file') {
                            return convertFile(item)
                        } else {
                            return convertFolder(item)
                        }
                    })
                    if (projectId !== null) {
                        loadSingleProject(ui, path)
                    } else {
                        setState({
                            ...state, isLoading: false, items: ui, path: path, error: null
                        })
                    }
                } else {
                    setState({
                        ...state, isLoading: false, isEmpty: true, error: null
                    })
                }
            } else {
                console.log("Error!")
                setState({
                    ...state, isLoading: false, isEmpty: false, error: errorConverter.convertTag(data.tag)
                })
            }
        }).catch((error) => {
            console.log(error)
            setState({
                ...state, isLoading: false, isEmpty: false, error: errorConverter.convertTag(error.data.tag)
            })
        })
    }

    const onFolderClick = async (folderPath: string, isFolderClick = true) => {
        setState({
            ...state, isLoading: true
        })
        if (!isFolderClick) {
            await load(folderPath)
        } else {
            const path = state.path + "/" + folderPath
            await load(path)
        }
    }

    function convertFile(item: FileResponse): FileUi {
        let isChecked = false
        if (state.selectedFile) {
            if (item.id === state.selectedFile.id) {
                isChecked = true
            }
        }
        return {
            id: item.id, type: DocumentType.file, name: item.name, date: item.client_modified, isChecked: isChecked, fileType: "file"
        }
    }

    function convertFolder(item: FileResponse): FolderUi {
        return {
            id: item.id, name: item.name, type: DocumentType.folder, isOpen: false
        }
    }

    const onBackClick = async () => {
        navigate(-1)
    }

    const onPathClick = async (path: string) => {
        const lastIndex = state.path.lastIndexOf(path)
        const subPath = state.path.substring(0, lastIndex + path.length)
        if (state.path !== subPath) {
            await onFolderClick(subPath, false)
        }
    }

    const onFileClick = async (fileId: string) => {
        setState({
            ...state, showContentHandler: {
                selectedFile: fileId, isShowContentModalVisible: true, setIsShowContentClick: () => {
                    setState({
                        ...state, showContentHandler: null
                    })
                }
            }
        })
    }

    const onCheckFileClick = async (file: FileUi) => {
        try {
            const input = document.getElementById("selectVideoDiv") as HTMLInputElement | null
            if (input !== null) {
                const items = state.items.map((document) => {
                    if (document.id === file.id) {
                        (document as FileUi).isChecked = input.checked
                    }
                    return document
                })
                if (state.projectId !== null && input.checked) {
                    const response = await updateVideo({projectId: state.projectId, videoUrl: file.id}).unwrap()
                    if (response.success) {
                        setState({
                            ...state, selectedFile: file, items: items
                        })
                    }
                } else {
                    setState({
                        ...state, items: items
                    })
                }
            }
        } catch (e: any) {
            //TODO: Create toast!
            console.log("Updated!")
        }
    }

    const onSettingsClick = () => {
        navigate(ShortsCutterRoutes.settings)
    }

    useEffect(() => {
        if (state.projectName !== "") {
            verify(state.projectName)
        }
    }, [state.projectName])

    const onNameChanged = (name: string) => {
        setState({
            ...state, projectName: name
        })
    }

    const verify = useCallback(debounce(async name => {
        if (state.projectId) {
            const result = await updateName({name: name, projectId: state.projectId}).unwrap()
            if (result.success) {
                console.log("Updated!")
            }
        }
    }, 300), []);

    const onEditClick = async () => {
        if (state.selectedFile === null) {
            console.log("click")
        } else {
            navigate(ShortsCutterRoutes.download)
        }
    }

    const onDeleteClick = async () => {
        if (state.projectId !== null) {
            const result = await deleteProjectMutation(state.projectId).unwrap()
            if (result.success) {
                navigate(-1)
            } else {
                //TODO: Create toast!
                console.log("Error in deleting project!")
            }
        }
    }

    return {
        state, onFolderClick, onBackClick, onPathClick, onFileClick, onCheckFileClick, onEditClick, onSettingsClick, onNameChanged, onDeleteClick
    }
}