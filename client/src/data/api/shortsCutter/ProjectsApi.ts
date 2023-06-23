import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ServerUrl} from "../../constants/Constants";
import {GetProjectResponse, GetProjectsResponse} from "../../models/projects/GetProjectsResponse";
import {CommonResponse} from "../../models/common/CommonResponse";
import {UpdateProjectName} from "../../../features/create/domain/UpdateProjectName";
import {CreateProjectResponse} from "../../models/projects/CreateProjectResponse";
import {UpdateProjectVideoUrl} from "../../../features/create/domain/UpdateProjectVideoUrl";

export const ProjectsApi = createApi({
    reducerPath: 'shortsCutter/api/projects', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/projects`, credentials: "include"
    }), endpoints: build => ({
        createProject: build.mutation<CreateProjectResponse, void>({
            query: (body) => ({
                url: `/create`, method: `POST`, body
            }), transformResponse: (response: CreateProjectResponse) => response
        }), getProject: build.mutation<GetProjectResponse, number>({
            query: (body) => ({
                url: `/getSingle`, method: `GET`, params: {
                    projectId: body
                }
            }), transformResponse: (response: GetProjectResponse) => response
        }), getProjects: build.mutation<GetProjectsResponse, void>({
            query: (body) => ({
                url: `/getAll`, method: `GET`, body
            }), transformResponse: (response: GetProjectsResponse) => response
        }), deleteProject: build.mutation<CommonResponse, number>({
            query: (body) => ({
                url: `/delete`, method: `DELETE`, params: {
                    projectId: body
                }
            }), transformResponse: (response: CommonResponse) => response
        }), updateProjectName: build.mutation<CommonResponse, UpdateProjectName>({
            query: (body) => ({
                url: `/updateName`, method: `POST`, body
            }), transformResponse: (response: CommonResponse) => response
        }), updateProjectVideoUrl: build.mutation<CommonResponse, UpdateProjectVideoUrl>({
            query: (body) => ({
                url: `/updateVideo`, method: `POST`, body
            }), transformResponse: (response: CommonResponse) => response
        }),
    })
})

export const {
    useGetProjectsMutation,
    useDeleteProjectMutation,
    useGetProjectMutation,
    useCreateProjectMutation,
    useUpdateProjectNameMutation,
    useUpdateProjectVideoUrlMutation
} = ProjectsApi