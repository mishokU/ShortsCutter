import {useEffect, useState} from "react";
import {initTimemarksState, TimemarksState} from "./TimemarksState";
import {
    useCreateTimemarkMutation, useDeleteTimemarkMutation, useGetTimemarksMutation, useUpdateEndTimeMutation, useUpdateStartTimeMutation
} from "../../../data/api/shortsCutter/TimemarksApi";
import {GetTimemarksResponse} from "../../../data/models/timemarks/GetTimemarksResponse";
import {ErrorConverter} from "../../../domain/errors/ErrorConverter";

export default function TimemarksViewModel(projectId: number | null) {

    const [state, setState] = useState<TimemarksState>(initTimemarksState)

    const [updateStartTime] = useUpdateStartTimeMutation()
    const [removeTimemark] = useDeleteTimemarkMutation()
    const [updateEndTime] = useUpdateEndTimeMutation()
    const [addTimemark] = useCreateTimemarkMutation()
    const [load] = useGetTimemarksMutation()

    const errorConverter = new ErrorConverter()

    useEffect(() => {

        async function loadTimemarks() {
            if (projectId) {
                return await load(projectId).unwrap()
            }
        }

        loadTimemarks()
            .then((response: GetTimemarksResponse | undefined) => {
                if (response) {
                    if (response.success) {
                        setState({
                            ...state, isLoading: false, error: null, timemarks: response.timemarks.map((timemark) => {
                                return {
                                    id: timemark.id,
                                    startTime: timemark.start_time.toString(),
                                    endTime: timemark.end_time.toString(),
                                    index: response.timemarks.indexOf(timemark) + 1
                                }
                            })
                        })
                    } else {
                        setState({
                            ...state, isLoading: false, error: errorConverter.convertMessage(response.message)
                        })
                    }
                } else {
                    setState({
                        ...state, isLoading: false, error: errorConverter.convertMessage("No project id!")
                    })
                }
            })
            .catch((error) => {
                setState({
                    ...state, isLoading: false, error: errorConverter.convertStatus(error.status)
                })
            })

    }, [])

    const onAddTimemarkClick = async () => {
        try {
            if (projectId !== null) {
                const response = await addTimemark(projectId).unwrap()
                if (response.success) {
                    const newTimemark = {id: response.timemarkId, startTime: "", endTime: "", index: state.timemarks.length + 1}
                    setState({
                        ...state, timemarks: state.timemarks.concat(newTimemark)
                    })
                } else {
                    console.log("Error!")
                }
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const onRemoveTimemarkClick = async (id: number) => {
        try {
            const response = await removeTimemark(id).unwrap()
            if (response.success) {
                const filteredArray = state.timemarks.filter(item => item.id !== id)
                setState({
                    ...state, timemarks: filteredArray
                })
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const onStartTimeChanged = async (timemarkId: number, time: string) => {
        try {

            const timemarks = state.timemarks.map((timemark) => {
                if (timemark.id === timemarkId) {
                    timemark.startTime = time
                }
                return timemark
            })
            setState({
                ...state, timemarks: timemarks
            })

            const response = await updateStartTime({timemarkId: timemarkId, time: time}).unwrap()
            if (response.success) {
                console.log("Updated!")
            }

        } catch (e: any) {
            console.log(e.message)
        }
    }

    const onEndTimeChanged = async (timemarkId: number, time: string) => {
        try {

            const timemarks = state.timemarks.map((timemark) => {
                if (timemark.id === timemarkId) {
                    timemark.endTime = time
                }
                return timemark
            })
            setState({
                ...state, timemarks: timemarks
            })

            const response = await updateEndTime({timemarkId: timemarkId, time: time}).unwrap()
            if (response.success) {
                console.log("Updated!")
            }

        } catch (e: any) {
            console.log(e.message)
        }
    }

    return {
        state, onAddTimemarkClick, onRemoveTimemarkClick, onStartTimeChanged, onEndTimeChanged
    }

}