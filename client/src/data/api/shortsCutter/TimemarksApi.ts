import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ServerUrl} from "../../constants/Constants";
import {CommonResponse} from "../../models/common/CommonResponse";
import {GetTimemarksResponse} from "../../models/timemarks/GetTimemarksResponse";
import {AddTimemarkResponse} from "../../models/timemarks/AddTimemarkResponse";
import {UpdateTimemarkTime} from "../../../features/create/domain/UpdateTimemarkTime";

export const TimemarksApi = createApi({
    reducerPath: 'shortsCutter/api/timemarks', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/timemarks`, credentials: "include"
    }), endpoints: build => ({
        createTimemark: build.mutation<AddTimemarkResponse, number>({
            query: (body) => ({
                url: `/create`, method: `POST`, body: {
                    projectId: body
                }
            }), transformResponse: (response: AddTimemarkResponse) => response
        }), getTimemarks: build.mutation<GetTimemarksResponse, number>({
            query: (body) => ({
                url: `/getAll`, method: `GET`, params: {
                    projectId: body
                }
            }), transformResponse: (response: GetTimemarksResponse) => response
        }), deleteTimemark: build.mutation<CommonResponse, number>({
            query: (body) => ({
                url: `/delete`, method: `DELETE`, params: {
                    timemarkId: body
                }
            }), transformResponse: (response: CommonResponse) => response
        }), updateStartTime: build.mutation<CommonResponse, UpdateTimemarkTime>({
            query: (body) => ({
                url: `/updateStartTime`, method: `POST`, body
            }), transformResponse: (response: CommonResponse) => response
        }), updateEndTime: build.mutation<CommonResponse, UpdateTimemarkTime>({
            query: (body) => ({
                url: `/updateEndTime`, method: `POST`, body
            }), transformResponse: (response: CommonResponse) => response
        }),
    })
})

export const {
    useCreateTimemarkMutation, useDeleteTimemarkMutation, useGetTimemarksMutation, useUpdateStartTimeMutation, useUpdateEndTimeMutation
} = TimemarksApi