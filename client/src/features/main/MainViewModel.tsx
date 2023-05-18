import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {initMainPageState, MainPageState} from "./MainPageState";
import {useNavigate} from "react-router-dom";
import {ShortsCutterRoutes} from "../../navigation/ShortsCutterRoutes";

export default function MainViewModel() {

    const [cookies] = useCookies(['folderPath']);
    const [state] = useState<MainPageState>(initMainPageState(cookies.folderPath))

    const navigate = useNavigate()

    useEffect(() => {
        console.log(cookies.folderPath)
        if (!cookies.folderPath) {
            navigate(ShortsCutterRoutes.settings)
        }
    }, [cookies.folderPath, navigate, state])

    return {
        state
    }

}