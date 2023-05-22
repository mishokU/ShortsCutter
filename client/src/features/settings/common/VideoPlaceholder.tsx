import React from "react";
import ReactPlayer from "react-player";

VideoPlaceholder.defaultProps = {
    onPointerMove: () => {
    }
}

export default function VideoPlaceholder(props: any) {

    const {
        onDragMove, onTextDragMove, setIsTextDragging, handleOnLogoClick, isTextDragging, setIsDragging, isDragging, children
    } = props;

    // const [isDragging, setIsDragging] = useState(false);
    // const [isTextDragging, setIsTextDragging] = useState(false);

    const handlePointerDown = (e: any) => {
        if (e.target.title === "Text") {
            setIsTextDragging(true)
        } else if (e.target.title === "Logo") {
            setIsDragging(true)
        }
    };

    const handlePointerUp = (e: any) => {
        console.log(e.target.title)
        if (e.target.title === "Logo") {
            if (!isTextDragging) {
                setIsDragging(false)
            }
        } else if (e.target.title === "Text") {
            if (!isDragging) {
                setIsTextDragging(false)
            }
        }
    };

    const handlePointerMove = (e: any) => {
        if (isDragging) {
            onDragMove(e)
        }
        if (isTextDragging) {
            onTextDragMove(e)
        }
    }

    return (<div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onDoubleClick={handleOnLogoClick}
        className="bg-placeholder w-[27em] h-[48em]">
        {/*<div className="absolute left-1/2 translate-x-1/2 bg-black h-full w-0.5" />*/}
        {/*<div className="absolute top-1/2 -translate-y-1/2 bg-black h-0.5 w-full" />*/}
        <ReactPlayer
            url={'https://www.youtube.com/shorts/t_MzwM8tjAU'}
            width='27em'
            height='48em'
            controls={true}
            className='react-player'/>
            {/*<div className="absolute left-1/2 translate-x-1/2 bg-black h-full w-0.5" />*/}
            {/*<div className="absolute top-1/2 -translate-y-1/2 bg-black h-0.5 w-full" />*/}
        {children}
    </div>)
}