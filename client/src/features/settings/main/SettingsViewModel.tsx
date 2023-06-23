import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {ShortsCutterRoutes} from "../../../navigation/ShortsCutterRoutes";
import {useState} from "react";

export default function SettingsViewModel() {

    const [cookies, setCookies] = useCookies(['folderPath']);
    const [isBackButtonVisible] = useState(cookies.folderPath !== "")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const onLogoOverlayClick = () => {
        navigate(ShortsCutterRoutes.logo)
    }

    const onOpenTextSettingsClick = () => {
        navigate(ShortsCutterRoutes.text)
    }

    const onDirChanged = (directoryPath: string) => {
        setError(null)
        setCookies('folderPath', directoryPath)
    }

    const onNextClick = () => {
        if (cookies.folderPath === "") {
            setError('First set working folder path!')
        } else if (isBackButtonVisible) {
            navigate(ShortsCutterRoutes.main)
        } else {
            navigate(ShortsCutterRoutes.main)
        }
    }

    return {
        onDirChanged, onLogoOverlayClick, error, onNextClick, onOpenTextSettingsClick, cookies, isBackButtonVisible
    }

}