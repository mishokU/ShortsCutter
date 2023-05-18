import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse} from "../models/auth/AuthResponse";
import {ServerUrl} from "../constants/Constants";

export const DropboxApi = createApi({
    reducerPath: 'shortsCutter/api/auth', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/auth`
    }), endpoints: build => ({
        login: build.mutation<AuthResponse, void>({
            query: (body) => ({
                url: `/login`, method: `GET`
            }),
            transformResponse: (response: AuthResponse) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                console.log(`response:`)
                console.log(baseQueryReturnValue)
                return baseQueryReturnValue as string
            }
        }),
    })
})

export const {
    useLoginMutation
} = DropboxApi