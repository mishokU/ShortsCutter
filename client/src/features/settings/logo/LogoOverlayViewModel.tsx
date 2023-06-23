import {useEffect, useRef, useState} from "react";
import {initSettingsState, SettingsState} from "./SettingsState";

export default function LogoOverlayViewModel() {

    const [state, setState] = useState<SettingsState>(initSettingsState)

    const leftBorder = 170
    const topBorder = 124
    const bottomBorder = 800
    const rightBorder = 310

    const textBottomBorder = 835
    const textLeftBorder = 192
    const textRightBorder = 574

    const boxReference = useRef<HTMLDivElement | null>(null)
    const textReference = useRef<HTMLDivElement | null>(null)

    const [isSelected, setIsSelected] = useState(false)
    const [isTextSelected, setIsTextSelected] = useState(false)

    const [translate, setTranslate] = useState({x: 85, y: 500})
    const [oldCoordinates, setOldCoordinates] = useState({x: 85, y: 500})

    const [textTranslate, setTextTranslate] = useState({x: 85, y: 400})
    const [oldTextCoordinates, setOldTextCoordinates] = useState({x: 85, y: 400})

    const [isDragging, setIsDragging] = useState(false);
    const [isTextDragging, setIsTextDragging] = useState(false);

    useEffect(() => {
        const handleWindowMouseMove = (event: any) => {
            if (event.clientX > 624 || event.clientX < 192 || event.clientY < 128 || event.clientY > 890) {
                setIsDragging(false)
                setIsTextDragging(false)
            }
        };
        window.addEventListener('mousemove', handleWindowMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove,);
        };
    }, []);

    const handleOnLogoClick = (e: any) => {
        if (e.target.title === "Logo" && !isDragging) {
            setIsSelected(!isSelected)
        } else {
            setIsTextSelected(!isTextSelected)
        }
    }

    const handleDragMove = (event: any) => {
        const type = event.target.title
        if (type === "Logo" && boxReference.current !== null) {
            const coordinates = boxReference.current.getBoundingClientRect()
            if (coordinates.y <= bottomBorder && coordinates.x <= rightBorder && coordinates.x >= leftBorder && coordinates.y >= topBorder) {
                setTranslate({x: translate.x + event.movementX, y: translate.y + event.movementY})
                setOldCoordinates({x: translate.x, y: translate.y})
            } else {
                setTranslate({x: oldCoordinates.x, y: oldCoordinates.y})
            }
        }
    }

    const handleTextDragMove = (event: any) => {
        const type = event.target.title
        if (type === "Text" && textReference.current !== null) {
            const coordinates = textReference.current.getBoundingClientRect()
            if (coordinates.y <= textBottomBorder && coordinates.x <= textRightBorder && coordinates.x >= textLeftBorder && coordinates.y >= topBorder) {
                setTextTranslate({x: textTranslate.x + event.movementX, y: textTranslate.y + event.movementY})
                setOldTextCoordinates({x: textTranslate.x, y: textTranslate.y})
            } else {
                setTextTranslate({x: oldTextCoordinates.x, y: oldTextCoordinates.y})
            }
        }
    }

    const onLineCountChanged = (count: number) => {
        setState({
            ...state,
            linesCount: count
        })
    }

    const onMaxLengthChanged = (count: number) => {
        setState({
            ...state,
            maxTextLength: count
        })
    }

    const onTextSizeChanged = (size: number) => {
        setState({
            ...state,
            textSize: size
        })
    }

    const handleChangeTextColor = () => {
        setState({
            ...state,
            isTexColorPickerVisible: !state.isTexColorPickerVisible
        })
    }

    const handleBorderPickerVisibility = () => {
        setState({
            ...state,
            isBorderColorPickerVisible: !state.isBorderColorPickerVisible
        })
    }


    const onChangeTextColor = (color: string) => {
        setState({
            ...state,
            textColor: color
        })
    }

    const onChangeStrokeColor = (color: string) => {
        setState({
            ...state,
            strokeColor: color
        })
    }

    const onChangeStrokeWidth = (width: number) => {
        setState({
            ...state,
            strokeWidth: width
        })
    }

    const [imageFile, setImageFile] = useState<File>()

    const uploadImagesResult = (event: any) => {
        if (event.target.files[0]) {
            setImageFile(event.target.files[0])
            const reader = new FileReader();
            const selectedFile = event.target.files[0];
            const imgtag: HTMLImageElement = document.getElementById("logo_image") as HTMLImageElement;
            reader.onload = function(event) {
                imgtag.src = event?.target?.result as string;
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    return {
        state,
        onLineCountChanged,
        handleDragMove,
        handleTextDragMove,
        isTextDragging,
        isDragging,
        setIsDragging,
        setIsTextDragging,
        handleOnLogoClick,
        onChangeStrokeColor,
        onTextSizeChanged,
        imageFile,
        uploadImagesResult,
        boxReference,
        onChangeTextColor,
        isTextSelected,
        onChangeStrokeWidth,
        handleBorderPickerVisibility,
        translate,
        handleChangeTextColor,
        onMaxLengthChanged,
        textTranslate,
        textReference
    }

}