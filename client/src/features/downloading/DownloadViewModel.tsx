import {useEffect, useState} from "react";
import {DownloadState, initDownloadState} from "./DownloadState";
import {useDownloadFullFileMutation} from "../../data/api/shortsCutter/EditorApi";
import {GetDownloadFullFileResponse} from "../../data/models/editor/GetDownloadFullFileResponse";
import {useNavigate} from "react-router-dom";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import FileSaver from "file-saver";

export default function DownloadViewModel() {

    const [state, setState] = useState<DownloadState>(initDownloadState)

    //const videoFolderPath = useCookies(['folderPath'])
    const [downloadFile] = useDownloadFullFileMutation()

    const navigate = useNavigate();

    const ffmpeg = createFFmpeg({
        log: true,
    });

    useEffect(() => {

        async function startDownload() {
            return downloadFile(9).unwrap()
        }

        startDownload()
            .then(async (response: GetDownloadFullFileResponse) => {

                console.log(response)

                console.log('Loading ffmpeg-core.js')
                await ffmpeg.load()
                console.log('Start transcoding')
                ffmpeg.FS('writeFile', 'test.avi', await fetchFile(response.fileUrl))
                await ffmpeg.run('-i', 'test.avi', 'test.mp4')
                console.log('Complete transcoding')
                const data = ffmpeg.FS('readFile', 'test.mp4')

                FileSaver.saveAs(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })), response.fileName)
                setState({
                    steps: []
                })
            })
            .catch((error) => console.log(error))

    })

    const onBackClick = () => {
        navigate(-1)
    }

    return {
        state, onBackClick
    }

}