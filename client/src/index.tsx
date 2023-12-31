import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './application/App';
import reportWebVitals from './reportWebVitals';
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "./data/store";
import {BrowserRouter} from 'react-router-dom'
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </PersistGate>
</Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();