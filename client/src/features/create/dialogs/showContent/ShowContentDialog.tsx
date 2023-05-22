import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {LoadingWidget} from "../../../../ui/widgets/LoadingWidget";
import useViewModel from "./ShowContentViewModel"
import {CloseWidget} from "../../../../ui/widgets/CloseWidget";
import {ShowContentHandler} from "../../page/CreateProjectPageState";
import {ErrorWidget} from "../../../../ui/widgets/ErrorWidget";

export interface ShowContentProps {
    handler: ShowContentHandler
}

export function ShowContentDialog({handler}: ShowContentProps) {
    const {state} = useViewModel(handler.selectedFile)
    return (<>
        <Transition appear show={handler.isShowContentModalVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                handler.setIsShowContentClick(false)
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center text-white">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className=" transform overflow-hidden h-[700px] border-2 border-[#29303A] w-3/5 rounded-2xl bg-[#0E1420] text-left align-middle shadow-xl transition-all">
                                {state.isLoading && <LoadingWidget />}
                                <div className="h-full">
                                    <div className="pr-6 pl-6  pt-8 flex justify-between">
                                        <h1 className="text-3xl font-bold">Content card</h1>
                                        <button onClick={() => handler.setIsShowContentClick(false)}
                                                className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                            <CloseWidget />
                                        </button>
                                    </div>
                                    {(state.errorModel === null && state.data !== null && state.type === 'photo') &&
                                        <div className="flex justify-center items-center h-full">
                                            <img src={state.data} alt="" />
                                        </div>}
                                    {(state.type === "video" && state.data !== null) && <video
                                        controls={true}
                                        className="mt-4 pb-20 w-full h-full rounded-md"
                                        src={state.data} />}
                                    <div className="flex justify-center items-center h-full">
                                        {state.errorModel !== null && <ErrorWidget error={state.errorModel} />}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}