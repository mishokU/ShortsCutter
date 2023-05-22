import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {DropboxLoginApi} from "../dropbox/DropboxLoginApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {DropboxFilesApi} from "../dropbox/DropboxFilesApi";

const persistConfig = {
    key: "root", storage,
};

const rootReducer = combineReducers({
    [DropboxLoginApi.reducerPath]: DropboxLoginApi.reducer,
    [DropboxFilesApi.reducerPath]: DropboxFilesApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(
        thunk,
        DropboxFilesApi.middleware,
        DropboxLoginApi.middleware,
    )
})

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;