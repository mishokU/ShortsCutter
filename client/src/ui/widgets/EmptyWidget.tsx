import Lottie from "lottie-react";
import emptyProjects from "../animations/empty.json";

export interface EmptyWidgetProps {
    text: string
}

export function EmptyWidget({text}: EmptyWidgetProps) {
    return <div className="h-full flex justify-center items-center text-white">
        <div>
            <h2 className="text-center">{text}</h2>
            <Lottie animationData={emptyProjects} />
        </div>
    </div>
}