export interface PathsComponentProps {
    paths: string[]
    onPathClick: (path: string) => void
}

export function PathsComponent({paths, onPathClick}: PathsComponentProps) {
    return <div className="flex space-x-2 mt-8 cursor-pointer text-white text-2xl">
        {paths.map((path) => <p
            key={path + Date()}
            className="underline decoration-paragraph"
            onClick={() => onPathClick(path)}>/ {path}</p>)}
    </div>
}