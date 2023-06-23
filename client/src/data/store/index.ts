import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {DropboxLoginApi} from "../api/dropbox/DropboxLoginApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {DropboxFilesApi} from "../api/dropbox/DropboxFilesApi";
import {ProjectsApi} from "../api/shortsCutter/ProjectsApi";
import {TimemarksApi} from "../api/shortsCutter/TimemarksApi";
import {EditorApi} from "../api/shortsCutter/EditorApi";

const persistConfig = {
    key: "root", storage
};

const rootReducer = combineReducers({
    [DropboxLoginApi.reducerPath]: DropboxLoginApi.reducer,
    [DropboxFilesApi.reducerPath]: DropboxFilesApi.reducer,
    [ProjectsApi.reducerPath]: ProjectsApi.reducer,
    [TimemarksApi.reducerPath]: TimemarksApi.reducer,
    [EditorApi.reducerPath]: EditorApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer, devTools: process.env.NODE_ENV !== "production", middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk, DropboxFilesApi.middleware, DropboxLoginApi.middleware, TimemarksApi.middleware, ProjectsApi.middleware, EditorApi.middleware)
})

setupListeners(store.dispatch);

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>