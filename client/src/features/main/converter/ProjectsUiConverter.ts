import {GetProjectResponse, GetProjectsResponse} from "../../../data/models/projects/GetProjectsResponse";
import {Project} from "../MainPageState";
import {getVideoCover} from "@rajesh896/video-thumbnails-generator";

export class ProjectsUiConverter {

    async convert(response: GetProjectsResponse): Promise<Project[]> {
        const promises = response.projects.map(async (project: GetProjectResponse) => {
            const name = this.resolveName(project.projectName)
            const preview = await this.resolveVideoPreview(project.videoPreview)
            return {
                id: project.id, name: name, preview: preview, date: project.date
            }
        })
        return Promise.all(promises)
    }

    resolveName(projectName: string): string {
        if (projectName === "") {
            return "Project without name"
        } else {
            return projectName
        }
    }

    async resolveVideoPreview(videoPreview: string): Promise<string> {
        return videoPreview
        if (videoPreview === "") {
            return videoPreview
        } else {
            return await getVideoCover(videoPreview, 1)
        }
    }

}