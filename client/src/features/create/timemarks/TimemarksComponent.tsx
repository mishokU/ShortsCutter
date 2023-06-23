import {FileUi} from "../ui/FileUi";
import useViewModel from "./TimemarksViewModel"

export interface TimemarksComponentProps {
    file: FileUi | null
    projectId: number | null
}

export function TimemarksComponent({file, projectId}: TimemarksComponentProps) {
    const {state, onAddTimemarkClick, onRemoveTimemarkClick, onStartTimeChanged, onEndTimeChanged} = useViewModel(projectId)
    return <div className="h-full min-w-[500px]">
        <h2 className="text-2xl text-secondary select-none">{file !== null ? file?.name : "File not selected"}</h2>
        <div className="flex justify-between mt-8 items-center">
            <h1 className="text-2xl text-white">Timemarks</h1>
            <div
                onClick={onAddTimemarkClick}
                className="hover:bg-black cursor-pointer p-2 rounded-full bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="#FFFFFF"
                     className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>
        {state.timemarks.length > 0 && <div
            className="w-full border-2 mt-6 scrollbar overflow-y-auto border-border p-4 space-y-4 max-h-[calc(100vh-300px)] rounded-md">
            {state.timemarks.map((timemark) => <div
                key={timemark.id}
                className="flex text-xl space-x-2 pt-2 pb-2 rounded-md text-white items-center">
                <h2 className="select-none pr-4">{timemark.index}</h2>
                <input
                    type={"time"}
                    value={timemark.startTime}
                    onChange={(field) => onStartTimeChanged(timemark.id, field.target.value)}
                    className="ml-6 p-2 bg-transparent w-1/2"
                    placeholder="00:00" />
                <input
                    type={"time"}
                    value={timemark.endTime}
                    onChange={(field) => onEndTimeChanged(timemark.id, field.target.value)}
                    className="p-2  bg-transparent w-1/2"
                    placeholder="00:00" />
                <div
                    onClick={() => onRemoveTimemarkClick(timemark.id)}
                    className="p-2 hover:bg-hover cursor-pointer rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor"
                         className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>)}
        </div>}
    </div>
}