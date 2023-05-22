import Lottie from "lottie-react";
import errorAnimation from "../animations/error.json";
import {ErrorModel, ErrorType} from "../../domain/errors/ErrorConverter";
import {buttonTheme} from "../Themes";

export interface ErrorWidgetProps {
    error: ErrorModel
    onButtonClick?: () => void
}

export function ErrorWidget({error, onButtonClick}: ErrorWidgetProps) {
    return <div className="h-full flex justify-center items-center text-white">
        <div>
            <h2 className="text-center">{error.message}</h2>
            <Lottie animationData={errorAnimation} />
            {error.type === ErrorType.LOGIN && <div>
                <button
                    onClick={onButtonClick}
                    className={buttonTheme}>Login
                </button>
            </div>}
        </div>
    </div>
}