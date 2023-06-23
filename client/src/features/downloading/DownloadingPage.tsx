import useViewModel from "./DownloadViewModel"
import backImg from "../../ui/assets/left_24px.png";

export function DownloadingPage() {
    const {state, onBackClick} = useViewModel()
    return <div className="h-full relative overflow-hidden">
        <button
            type="button"
            onClick={onBackClick}
            className="w-[55px] bg-[#ffb81c] absolute m-8 z-10 rounded-full  p-4 text-center inline-flex">
            <img src={backImg} />
            <span className="sr-only">Icon description</span>
        </button>
        <div className="flex text-2xl text-white items-center justify-center h-full space-x-32">
            <div className="space-y-6">
                <h1>Step 1: download full video 0 : 100</h1>
                <h1>Step 2: cutting all short by timemarks 0 : 100</h1>
                <h1>Step 3: from 16:9 to 9:16 with face marks 0 : 100</h1>
                <h1>Step 4: export all audio tracks for transkribation and replace all bad words 0 : 100</h1>
                <h1>Step 5: logo image overlay 0 : 100</h1>
                <h1>Step 6: mute all bad words in audio 0 : 100</h1>
                <h1>Step 7: removing watermarks from videos(optional) 0 : 100</h1>
                <h1>Step 8: Indicate or Automatically Set the Perceived Name 0 : 100</h1>
                <h1>Step 9: Removing Silent Fragments and Gluing 0 : 100</h1>
            </div>
            <div>
                <h1>Progress...</h1>
            </div>
        </div>
        {state.steps.toString()}
    </div>
}