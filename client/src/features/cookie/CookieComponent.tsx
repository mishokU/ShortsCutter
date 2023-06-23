import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {buttonThemeFit} from "../../ui/Themes";
import {ShortsCutterRoutes} from "../../navigation/ShortsCutterRoutes";

export function CookieComponent() {
    const navigate = useNavigate()
    const [, setCookie] = useCookies(['CookieConsent']);
    return <div
        className="fixed text-white flex items-center left-1/2 -translate-x-1/2 h-fit bottom-4 bg-placeholder rounded-md w-fit space-x-4 p-4">
        <p>This website uses cookies to enhance the user <br/> experience. Please visit our <a
            onClick={() => {
                navigate(ShortsCutterRoutes.privacy)
            }}
            className="cursor-pointer text-[#ffb81c] underline">privacy page</a> for
            more <br/> details.</p>
        <button
            className={buttonThemeFit}
            onClick={() => setCookie('CookieConsent', true)}>
            I understand
        </button>
    </div>
}