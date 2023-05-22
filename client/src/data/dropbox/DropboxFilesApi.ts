import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ServerUrl} from "../constants/Constants";
import {FilesResponse} from "../models/files/FilesResponse";
import {GetFilesByFolderRequest} from "../../features/create/domain/GetFilesByFolderRequest";
import {GetFileRequest} from "../../features/create/domain/GetFileRequest";
import {SingleFileResponse} from "../models/files/SingleFileResponse";

export const DropboxFilesApi = createApi({
    reducerPath: 'shortsCutter/api/files', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/media`
    }), endpoints: build => ({
        getFilesByFolder: build.mutation<FilesResponse, GetFilesByFolderRequest>({
            query: (body) => ({
                url: `/files`, method: `GET`, params: {
                    token: body.token, folder: body.folder
                }
            }), transformResponse: (response: FilesResponse) => response
        }),
        getFile: build.mutation<SingleFileResponse, GetFileRequest>({
            query: (body) => ({
                url: `/file`, method: `GET`, params: {
                    token: body.token, fileId: body.fileId
                }
            }), transformResponse: (response: SingleFileResponse) => response
        }),
    })
})

export const {
    useGetFilesByFolderMutation,
    useGetFileMutation
} = DropboxFilesApi