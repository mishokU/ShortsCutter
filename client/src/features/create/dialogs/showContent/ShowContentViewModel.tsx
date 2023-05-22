import {useEffect, useState} from "react";
import {initShowContentState, ShowContentState} from "./ShowContentState";
import {useGetFileMutation} from "../../../../data/dropbox/DropboxFilesApi";
import {useCookies} from "react-cookie";
import {ErrorConverter} from "../../../../domain/errors/ErrorConverter";
import {Buffer} from 'buffer';

export default function ShowContentViewModel(fileId: string) {

    const [state, setState] = useState<ShowContentState>(initShowContentState)
    const [cookie] = useCookies(['token']);

    const [getFile] = useGetFileMutation()
    const errorConverter = new ErrorConverter()

    useEffect(() => {

        async function loadFile() {
            return await getFile({token: cookie.token, fileId: fileId}).unwrap()
        }

        loadFile()
            .then((result) => {
                console.log(result)
                if (result.success) {
                    setState({
                        ...state, isLoading: false, type: result.type, data: result.fileLink
                    })

                } else {
                    setState({
                        ...state, isLoading: false, errorModel: errorConverter.convertStatus(result.status)
                    })
                }
            })
            .catch((error) => console.log(error))

    }, [])

    return {
        state
    }

}