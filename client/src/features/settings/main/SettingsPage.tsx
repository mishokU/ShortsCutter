import {buttonTheme, buttonThemeTransparent, inputStyle} from "../../../ui/Themes";
import {BackButton} from "../../../ui/widgets/backButton";
import useViewModel from "./SettingsViewModel"

export function SettingsPage() {
    const {
        isBackButtonVisible, onNextClick, onLogoOverlayClick, onDirChanged, error, cookies
    } = useViewModel()
    return <div className="h-full relative">
        {isBackButtonVisible && <BackButton />}
        <div className="flex h-full w-full justify-center items-center">
            <div className="flex gap-24 grid-cols-2">
                <div className="text-white space-y-8 pt-16">
                    <h1 className="text-4xl font-bold text-center">Settings!</h1>
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Choose folder to save your videos!</h2>
                        <input
                            onChange={(path) => onDirChanged(path.target.value)}
                            placeholder="C:\Users\mishausov\shortsCutter"
                            value={cookies.folderPath}
                            className={inputStyle} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl">Additional settings!</h2>
                        <button
                            onClick={onLogoOverlayClick}
                            className={buttonTheme}>
                            Choose logo overlay
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={onNextClick}
                            className={buttonThemeTransparent + ' w-fit'}>
                            Next
                        </button>
                    </div>
                    <div className="h-[20px] bg-transparent">
                        {error !== null && <div className="text-center text-error">{error}</div>}
                    </div>
                </div>
                <div className="text-paragraph font-semibold text-5xl max-w-xl flex justify-center items-center">
                    <p>Here are some settings that will make your life easier when processing your
                        videos, here you can set the path in which your videos will be saved, as well as
                        many parameters in which your videos will be mounted, good luck!
                    </p>
                </div>
            </div>
        </div>
    </div>
}