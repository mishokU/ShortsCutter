import {FileUi} from "../../ui/FileUi";

export interface FileProps {
    file: FileUi
}

export function VideoItem({file}: FileProps) {
    return <div className="text-white cursor-pointer p-3 hover:bg-hover hover:rounded-md">
        <h2>{file.name}</h2>
    </div>
}