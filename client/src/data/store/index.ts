import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {DropboxApi} from "../dropbox/DropboxApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root", storage,
};

const rootReducer = combineReducers({
    [DropboxApi.reducerPath]: DropboxApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(
        thunk,
        DropboxApi.middleware,
    )
})

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;