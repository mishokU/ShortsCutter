import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {initMainPageState, MainPageState} from "./MainPageState";
import {useLocation, useNavigate} from "react-router-dom";
import {ShortsCutterRoutes} from "../../navigation/ShortsCutterRoutes";

export default function MainViewModel() {

    const [cookies] = useCookies(['folderPath']);
    const [, setToken] = useCookies(['token']);

    const [state] = useState<MainPageState>(initMainPageState(cookies.folderPath))

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token')
        if (token) {
            setToken('token', query.get('token'))
        }
        if (!cookies.folderPath) {
            navigate(ShortsCutterRoutes.settings)
        }
    }, [cookies.folderPath, navigate, state])

    const onCreateProjectClick = () => {
        navigate(ShortsCutterRoutes.create)
    }

    return {
        state, onCreateProjectClick
    }

}