import useViewModel from "./AuthViewModel"
import {buttonTheme} from "../../ui/Themes";

export function AuthPage() {
    const {onLoginClick} = useViewModel()
    return <div className="w-full h-full flex justify-center items-center">
        <div className="space-y-6">
            <h1 className="text-white text-2xl">Dropbox auth</h1>
            <div className="space-y-4">
                <button
                    onClick={onLoginClick}
                    className={buttonTheme}>
                    Login
                </button>
            </div>
        </div>
    </div>
}