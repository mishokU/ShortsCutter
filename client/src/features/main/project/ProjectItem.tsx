import {Project} from "../MainPageState";

export interface ProjectProps {
    project: Project
}

export function ProjectItem({project}: ProjectProps) {
    return <div className="w-[32em] h-[18em] space-y-4">
        <h1 className="text-white text-xl">{project.name}</h1>
        <div className="bg-secondary w-full h-full">
        </div>
    </div>
}