import {BackButton} from "../../../ui/widgets/backButton";
import {useRef, useState} from "react";
import VideoPlaceholder from "../common/VideoPlaceholder";
import {buttonTheme, inputStyle, secondaryColor} from "../../../ui/Themes";

export function LogoOverlayPage() {

    const leftBorder = 192
    const topBorder = 124
    const bottomBorder = 835
    const rightBorder = 335

    const boxReference = useRef(null)

    const [translate, setTranslate] = useState({x: 0, y: 0})
    const [oldCoordinates, setOldCoordinates] = useState({x: 0, y: 0})

    const [textTranslate, setTextTranslate] = useState({x: 0, y: 0})
    const [textOldCoordinates, setTextOldCoordinates] = useState({x: 0, y: 0})

    const handleDragMove = (e: any) => {
        // @ts-ignore
        const coordinates = boxReference.current.getBoundingClientRect()
        if (coordinates.y <= bottomBorder && coordinates.x <= rightBorder && coordinates.x >= leftBorder && coordinates.y >= topBorder) {
            setTranslate({x: translate.x + e.movementX, y: translate.y + e.movementY})
            setOldCoordinates({x: translate.x, y: translate.y})
        } else {
            setTranslate({x: oldCoordinates.x, y: oldCoordinates.y})
        }
    }

    const handleTextDragMove = (e: any) => {
        // @ts-ignore
        const coordinates = boxReference.current.getBoundingClientRect()
        if (coordinates.y <= bottomBorder && coordinates.x <= rightBorder && coordinates.x >= leftBorder && coordinates.y >= topBorder) {
            setTextTranslate({x: textTranslate.x + e.movementX, y: textTranslate.y + e.movementY})
            setTextOldCoordinates({x: textTranslate.x, y: textTranslate.y})
        } else {
            setTranslate({x: textOldCoordinates.x, y: textOldCoordinates.y})
        }
    }

    return <div className="h-full relative">
        <BackButton />
        <div className="absolute bottom-24 right-24 w-[200px]">
            <button className={buttonTheme}>
                Save
            </button>
        </div>
        <div className="pt-32 pl-24 flex grid-cols-2 gap-16">
            <div className="ml-24 space-y-6">
                <VideoPlaceholder onDragMove={handleDragMove}>
                    <div
                        ref={boxReference}
                        style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`}}>
                        <div className="bg-black w-[18em] h-[4em] justify-center flex items-center text-white">Logo</div>
                    </div>
                    <div
                        ref={boxReference}
                        style={{transform: `translateX(${textTranslate.x}px) translateY(${textTranslate.y}px)`}}>
                        <div className="w-[18em] h-[4em] justify-center flex items-center text-white">Text</div>
                    </div>
                </VideoPlaceholder>
                <button className={buttonTheme}>
                    Choose logo
                </button>
            </div>
            <div className="text-white flex grid-cols-3 gap-6">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Max length</h2>
                        <input
                            onChange={(path) => {
                            }}
                            placeholder="0-80"
                            className={inputStyle} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Border color</h2>
                        <input
                            onChange={(path) => {
                            }}
                            placeholder="C:\Users\mishausov\shortsCutter"
                            className={inputStyle} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Border size</h2>
                        <input
                            onChange={(path) => {
                            }}
                            placeholder="C:\Users\mishausov\shortsCutter"
                            className={inputStyle} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Text color</h2>
                        <input
                            onChange={(path) => {
                            }}
                            placeholder="C:\Users\mishausov\shortsCutter"
                            className={inputStyle} />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Line count Font size</h2>
                        <input
                            onChange={(path) => {
                            }}
                            placeholder="C:\Users\mishausov\shortsCutter"
                            className={inputStyle} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Font size</h2>
                        <input
                            onChange={(path) => {
                            }}
                            placeholder="C:\Users\mishausov\shortsCutter"
                            className={inputStyle} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl mr-24">Font</h2>
                        <input
                            onChange={(path) => {
                            }}
                            placeholder="C:\Users\mishausov\shortsCutter"
                            className={inputStyle} />
                    </div>
                </div>
                <div>
                    <p className="text-paragraph text-2xl">There you can set .....</p>
                </div>
            </div>
        </div>
    </div>
}