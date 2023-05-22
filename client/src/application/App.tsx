import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AuthPage} from "../features/auth/AuthPage";
import {NonExistsPage} from "../features/nonExists/NonExistsPage";
import {MainPage} from "../features/main/MainPage";
import {ShortsCutterRoutes} from "../navigation/ShortsCutterRoutes";
import {SettingsPage} from "../features/settings/main/SettingsPage";
import {LogoOverlayPage} from "../features/settings/logo/LogoOverlayPage";
import {TextSettingsPage} from "../features/settings/texts/TextSettingsPage";
import {CreateProjectPage} from "../features/create/page/CreateProjectPage";

function App() {
    return (<div className="h-screen w-screen relative">
        <Routes>
            <Route path="*" element={<NonExistsPage />} />
            <Route index element={<AuthPage />} />
            <Route path={ShortsCutterRoutes.main} element={<MainPage />} />
            <Route path={ShortsCutterRoutes.create} element={<CreateProjectPage />} />
            <Route path={ShortsCutterRoutes.settings}>
                <Route index element={<SettingsPage />} />
                <Route path={ShortsCutterRoutes.logo} element={<LogoOverlayPage />} />
                <Route path={ShortsCutterRoutes.text} element={<TextSettingsPage />} />
            </Route>
        </Routes>
    </div>);
}

export default App;