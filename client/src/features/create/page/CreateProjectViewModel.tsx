import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {FileResponse, FilesResponse} from "../../../data/models/files/FilesResponse";
import {DocumentType} from "../ui/DocumentEntityUi";
import {ErrorConverter} from "../../../domain/errors/ErrorConverter";
import {FileUi} from "../ui/FileUi";
import {FolderUi} from "../ui/FolderUi";
import {CreateProjectPageState, initCreateProjectPageState} from "./CreateProjectPageState";
import {useNavigate} from "react-router-dom";
import {useGetFilesByFolderMutation} from "../../../data/dropbox/DropboxFilesApi";
import {ShortsCutterRoutes} from "../../../navigation/ShortsCutterRoutes";

export default function CreateProjectViewModel() {

    const [cookie] = useCookies(['token']);

    const [state, setState] = useState<CreateProjectPageState>(initCreateProjectPageState)

    const [loadFiles] = useGetFilesByFolderMutation()

    const navigate = useNavigate();
    const errorConverter = new ErrorConverter()

    useEffect(() => {
        load("Dropbox").then(r => {
        })
    }, [])

    async function load(path: string) {
        await loadFiles({token: cookie.token, folder: path}).unwrap().then((data: FilesResponse) => {
            if (data.success) {
                if (data.files.length > 0) {
                    const ui = data.files.map((item) => {
                        if (item[".tag"] === 'file') {
                            return convertFile(item)
                        } else {
                            return convertFolder(item, data.files)
                        }
                    })
                    setState({
                        ...state, isLoading: false, items: ui, path: path, error: null
                    })
                } else {
                    setState({
                        ...state, isLoading: false, isEmpty: true, error: null
                    })
                }
            } else {
                setState({
                    ...state, isLoading: false, isEmpty: false, error: errorConverter.convertTag(data.tag)
                })
            }
        }).catch((error) => {
            setState({
                ...state, isLoading: false, isEmpty: false, error: errorConverter.convertTag(error.data.tag)
            })
        })
    }

    const onFolderClick = async (folderPath: string, isFolderClick: boolean = true) => {
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
        return {
            id: item.id, type: DocumentType.file, name: item.name, date: item.client_modified, icon: ""
        }
    }

    function convertFolder(item: FileResponse, data: FileResponse[]): FolderUi {
        return {
            id: item.id, name: item.name, type: DocumentType.folder, icon: "", isOpen: false
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

    const onCheckFileClick = (file: FileUi) => {
        setState({
            ...state, selectedFile: file
        })
    }

    const onSettingsClick = () => {
        navigate(ShortsCutterRoutes.settings)
    }

    const onEditClick = () => {

    }

    return {
        state, onFolderClick, onBackClick, onPathClick, onFileClick, onCheckFileClick, onEditClick, onSettingsClick
    }
}