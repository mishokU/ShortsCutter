import {FolderUi} from "../../ui/FolderUi";
import {DownArrow} from "./DownArrow";
import {RightArrow} from "./RightArrow";

export interface FolderProps {
    folder: FolderUi
    onFolderClick: (folderId: string) => void
}

export function FolderItem({folder, onFolderClick}: FolderProps) {
    return (<div className="container">
        <>
            <div
                onClick={() => onFolderClick(folder.name)}
                className="text-xl cursor-pointer flex hover:bg-hover p-3 hover:rounded-md justify-between items-center">
                <h1>{folder.name}</h1>
                <div>
                    {folder.isOpen ? <DownArrow /> : <RightArrow />}
                </div>
            </div>
        </>
    </div>)
}