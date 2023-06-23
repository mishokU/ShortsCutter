import useViewModel from "./CreateProjectViewModel"
import {FileItem} from "../items/file/FileItem";
import {FolderItem} from "../items/folder/FolderItem";
import {DocumentType} from "../ui/DocumentEntityUi";
import {FolderUi} from "../ui/FolderUi";
import {FileUi} from "../ui/FileUi";
import {ErrorWidget} from "../../../ui/widgets/ErrorWidget";
import {EmptyWidget} from "../../../ui/widgets/EmptyWidget";
import {LoadingWidget} from "../../../ui/widgets/LoadingWidget";
import useAuthViewModel from "../../auth/AuthViewModel"
import backImg from "../../../ui/assets/left_24px.png";
import {PathsComponent} from "../items/paths/PathsComponent";
import {ShowContentDialog} from "../dialogs/showContent/ShowContentDialog";
import {TimemarksComponent} from "../timemarks/TimemarksComponent";
import {buttonThemeFitBig} from "../../../ui/Themes";
import {useParams} from "react-router-dom";
import {DeleteIcon} from "../../../ui/widgets/DeleteIcon";

export function CreateProjectPage() {

    const {projectId} = useParams()

    const {
        state, onFolderClick, onBackClick, onPathClick, onFileClick, onCheckFileClick, onSettingsClick, onEditClick, onNameChanged, onDeleteClick
    } = useViewModel(projectId)

    const {onLoginClick} = useAuthViewModel()

    return <div className="h-full relative overflow-hidden">
        <button
            type="button"
            onClick={onBackClick}
            className="w-[55px] bg-[#ffb81c] absolute m-8 z-10 rounded-full  p-4 text-center inline-flex">
            <img src={backImg} />
            <span className="sr-only">Icon description</span>
        </button>
        {state.error === null && <div className="absolute left-1/2 top-8 w-fit -translate-x-1/2">
            <input
                value={state.projectName}
                onChange={(field) => onNameChanged(field.target.value)}
                className="bg-transparent text-white text-center border-2 border-secondary p-2 rounded-md text-2xl w-fit"
                placeholder="Project name" />
        </div>}
        <button
            type="button"
            onClick={onDeleteClick}
            className="bg-error z-10 absolute right-8 top-8 rounded-full w-14 h-14 p-4 text-center inline-flex">
            <DeleteIcon />
            <span className="sr-only">Icon description</span>
        </button>
        {state.showContentHandler !== null && <ShowContentDialog handler={state.showContentHandler} />}
        {(state.error === null && !state.isEmpty) && <div className="p-32 flex w-full h-full space-x-12">
            <div className="min-w-[600px]">
                <h1 className="text-2xl text-white">Dropbox files</h1>
                <PathsComponent paths={state.path.split('/')} onPathClick={onPathClick} />
                <div
                    className="border-2 border-border relative max-w-[600px] mt-8 rounded-md p-4 space-y-6 text-white overflow-y-auto scrollbar min-h-[calc(100vh-300px)]">
                    {state.isLoading && <LoadingWidget />}
                    {!state.isLoading && state.items.map((item) => ((item.type === DocumentType.folder && <FolderItem
                        key={item.name}
                        onFolderClick={onFolderClick}
                        folder={item as FolderUi} />) || (item.type === DocumentType.file && <FileItem
                        onCheckClick={onCheckFileClick}
                        onFileClick={onFileClick}
                        key={item.name}
                        file={item as FileUi} />)))}
                </div>
            </div>
            <TimemarksComponent file={state.selectedFile} projectId={state.projectId} />
            <p className="mt-32 text-paragraph text-2xl">
                This you can find all your files in dropbox and select one, after selection set timemarks to download
                and press "Edit"
            </p>
            <div className="absolute right-24 bottom-16 w-[300px] flex space-x-4">
                <button
                    onClick={onSettingsClick}
                    className={buttonThemeFitBig + ' w-full'}>Settings
                </button>
                <button
                    onClick={onEditClick}
                    className={buttonThemeFitBig + ' w-full'}>Edit
                </button>
            </div>
        </div>}
        {state.error !== null && <ErrorWidget error={state.error} onButtonClick={onLoginClick} />}
        {state.isEmpty && <EmptyWidget text={"Empty files!"} />}
    </div>
}