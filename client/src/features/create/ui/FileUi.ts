import {DocumentEntityUi} from "./DocumentEntityUi";

export interface FileUi extends DocumentEntityUi {
    date: string
    isChecked: boolean
    fileType: string
}