import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse} from "../../models/auth/AuthResponse";
import {ServerUrl} from "../../constants/Constants";

export const DropboxLoginApi = createApi({
    reducerPath: 'shortsCutter/api/auth', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/auth`
    }), endpoints: build => ({
        login: build.mutation<AuthResponse, void>({
            query: () => ({
                url: `/login`, method: `GET`
            }), transformResponse: (response: AuthResponse) => response
        })
    })
})

export const {
    useLoginMutation
} = DropboxLoginApi