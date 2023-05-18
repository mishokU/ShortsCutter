import React, {useState} from "react";

VideoPlaceholder.defaultProps = {
    onPointerDown: () => {
    }, onPointerUp: () => {
    }, onPointerMove: () => {
    }
};

export default function VideoPlaceholder(props: any) {

    const {
        onPointerDown, onPointerUp, onPointerMove, onDragMove, children
    } = props;

    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (e: any) => {
        setIsDragging(true)
        onPointerDown(e)
    };

    const handlePointerUp = (e: any) => {
        setIsDragging(false)
        onPointerUp(e)
    };

    const handlePointerMove = (e: any) => {
        if (isDragging) {
            onDragMove(e)
        }
        onPointerMove(e)
    }

    return (<div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        className="bg-placeholder relative w-[27em] h-[48em]">
        {/*<div className="absolute left-1/2 translate-x-1/2 bg-black h-full w-0.5" />*/}
        {/*<div className="absolute top-1/2 -translate-y-1/2 bg-black h-0.5 w-full" />*/}
        {children}
    </div>)
}