import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ServerUrl} from "../../constants/Constants";
import {GetDownloadFullFileResponse} from "../../models/editor/GetDownloadFullFileResponse";

export const EditorApi = createApi({
    reducerPath: 'shortsCutter/api/editor', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/editor`, credentials: "include"
    }), endpoints: build => ({
        downloadFullFile: build.mutation<GetDownloadFullFileResponse, number>({
            query: (body) => ({
                url: `/download`, method: `POST`, body: {
                    projectId: body
                }
            }), transformResponse: (response: GetDownloadFullFileResponse) => response
        }),
    })
})

export const {
    useDownloadFullFileMutation
} = EditorApi