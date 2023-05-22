
export enum DocumentType {
    file,
    folder
}

export interface DocumentEntityUi {
    id: string
    name: string
    icon: string
    type: DocumentType
}