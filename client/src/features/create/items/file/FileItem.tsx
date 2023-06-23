import {FileUi} from "../../ui/FileUi";

export interface FileProps {
    file: FileUi
    onFileClick: (fileUrl: string) => void
    onCheckClick: (file: FileUi) => void
}

export function FileItem({file, onFileClick, onCheckClick}: FileProps) {
    return <div
        className="text-white cursor-pointer p-3 hover:bg-hover hover:rounded-md flex justify-between items-center">
        <h2
            className="w-full text-xl pr-4"
            onClick={() => onFileClick(file.id)}>{file.name}</h2>
        {file.name.endsWith(".mp4") && <div>
            <div className="flex items-center h-5">
                <input
                    id="selectVideoDiv"
                    onChange={() => onCheckClick(file)}
                    type="checkbox"
                    checked={file.isChecked}
                    value=""
                    className="w-6 h-6 cursor-pointer accent-secondary bg-gray-100 border-gray-300 rounded-md" />
            </div>
        </div>}
    </div>
}