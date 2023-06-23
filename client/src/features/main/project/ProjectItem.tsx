import {Project} from "../MainPageState";

export interface ProjectProps {
    project: Project
    onProjectClick: (projectId: number) => void
}

export function ProjectItem({project, onProjectClick}: ProjectProps) {
    return <div className="w-[32em] h-[18em] space-y-4">
        <div className="flex justify-between">
            <h1 className="text-white text-xl">{project.name}</h1>
            <h1 className="text-white text-xl">{project.date}</h1>
        </div>
        <div
            onClick={() => onProjectClick(project.id)}
            className="bg-secondary cursor-pointer w-full rounded-md h-full hover:opacity-95 flex items-center justify-center">
            {project.preview !== "" && <img src={project.preview}/>}
            {project.preview === "" && <h1>File not selected!</h1>}
        </div>
    </div>
}