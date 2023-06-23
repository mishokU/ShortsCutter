import {BackButton} from "../../../ui/widgets/backButton";
import VideoPlaceholder from "../common/VideoPlaceholder";
import {buttonTheme, inputStyle} from "../../../ui/Themes";
import test from "../assets/test.jpeg"
import useViewModel from "./LogoOverlayViewModel"
import {Sketch} from '@uiw/react-color';

export function LogoOverlayPage(this: any) {
    const {
        state,
        isTextDragging,
        isDragging,
        setIsDragging,
        setIsTextDragging,
        handleTextDragMove,
        handleDragMove,
        handleOnLogoClick,
        textReference,
        onTextSizeChanged,
        boxReference,
        onChangeStrokeColor,
        onChangeStrokeWidth,
        handleChangeTextColor,
        onChangeTextColor,
        onMaxLengthChanged,
        uploadImagesResult,
        textTranslate,
        handleBorderPickerVisibility,
        translate,
        onLineCountChanged
    } = useViewModel()

    const logoStyle = "select-none cursor-pointer z-10 w-[18em] h-[4em] justify-center flex items-center text-white"
    return <div className="h-full relative">
        <BackButton />
        <div className="absolute bottom-24 right-24 w-[200px]">
            <button className={buttonTheme}>
                Save
            </button>
        </div>
        <div className="pt-32 pl-24 flex grid-cols-2 gap-16">
            <div className="ml-24 space-y-6">
                <div className="relative">
                    <VideoPlaceholder
                        onDragMove={handleDragMove}
                        onTextDragMove={handleTextDragMove}
                        isDragging={isDragging}
                        setIsDragging={setIsDragging}
                        isTextDragging={isTextDragging}
                        setIsTextDragging={setIsTextDragging}
                        handleOnLogoClick={handleOnLogoClick}
                    >
                        <div
                            ref={textReference}
                            style={{transform: `translateX(${textTranslate.x}px) translateY(${textTranslate.y}px)`}}>
                            <textarea
                                title="Text"
                                placeholder={"text"}
                                rows={state.linesCount}
                                maxLength={state.maxTextLength}
                                style={{
                                    position: 'absolute',
                                    textShadow: "",
                                    stroke: "#ffffff",
                                    strokeWidth: 10,
                                    fontSize: `${state.textSize}px`,
                                    cursor: "pointer",
                                    color: `${state.textColor}`,
                                    resize: "none",
                                    outline: "none",
                                    height: "200px",
                                    overflow: "hidden",
                                    font: 'Poppins',
                                    width: '300px',
                                    background: "transparent",
                                    boxShadow: "initial",
                                    WebkitTextStrokeColor: `${state.strokeColor}`,
                                    WebkitTextStrokeWidth: `${state.strokeWidth}px`
                                }}
                            />
                        </div>
                        <div
                            id="logo"
                            ref={boxReference}
                            style={{
                                width: 'fit-content',
                                transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
                            }}>
                            <div className="flex">
                                <div className={logoStyle} title="Logo">
                                    <img
                                        id="logo_image"
                                        src={test}
                                        className="select-none drag-none pointer-events-none bg-transparent" />
                                </div>
                            </div>
                        </div>
                    </VideoPlaceholder>
                </div>
                <div>
                    <label
                        htmlFor="image_uploads"
                        className="bg-secondary hover:text-white text-black inline-block w-full text-center text-sm font-bold py-3 px-8 rounded-lg cursor-pointer">
                        Choose logo
                    </label>
                    <input
                        type="file"
                        onChange={uploadImagesResult}
                        id="image_uploads"
                        name="image_uploads"
                        className="hidden"
                        readOnly={true}
                        accept=".jpg, .jpeg, .png" />
                </div>
            </div>
            <div className="text-white">
                <div className="flex grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl mr-24">Max length</h2>
                            <input
                                type={"number"}
                                onChange={(path) => onMaxLengthChanged(Number(path.target.value))}
                                placeholder="0-80"
                                min={0}
                                max={80}
                                className={inputStyle} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl mr-24">Stroke color</h2>
                            <input
                                onClick={handleBorderPickerVisibility}
                                placeholder="none"
                                className={inputStyle} />
                            {state.isBorderColorPickerVisible && <Sketch
                                style={{position: "absolute", color: 'black'}}
                                color={'#dddddd'}
                                onChange={(color) => {
                                    onChangeStrokeColor(color.hex)
                                }} />}
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl mr-24">Stroke width</h2>
                            <input
                                type={"number"}
                                min={0}
                                onChange={(field) => onChangeStrokeWidth(Number(field.target.value))}
                                placeholder="0"
                                className={inputStyle} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl mr-24">Line count</h2>
                            <input
                                type={"number"}
                                max={2}
                                min={1}
                                onChange={(path) => onLineCountChanged(Number(path.target.value))}
                                placeholder="1"
                                className={inputStyle} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl mr-24">Text color</h2>
                            <input
                                onClick={handleChangeTextColor}
                                onChange={(field) => {
                                    onChangeTextColor(field.target.value)
                                }}
                                placeholder="white"
                                className={inputStyle} />
                            {state.isTexColorPickerVisible && <Sketch
                                style={{position: "absolute", color: 'black'}}
                                color={'#dddddd'}
                                onChange={(color) => {
                                    onChangeTextColor(color.hex)
                                }} />}
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl mr-24">Text size</h2>
                            <input
                                onChange={(path) => onTextSizeChanged(Number(path.target.value))}
                                type={"number"}
                                max={80}
                                min={4}
                                placeholder="4"
                                className={inputStyle} />
                        </div>
                    </div>
                </div>
                <div className="space-y-4 mt-4">
                    <h2 className="text-xl mr-24">Font</h2>
                    <input
                        placeholder="Arial"
                        className={inputStyle} />
                    {

                    }
                </div>
            </div>
            <div>
                <p className="text-paragraph text-2xl">There you can set .....</p>
            </div>
        </div>
    </div>
}