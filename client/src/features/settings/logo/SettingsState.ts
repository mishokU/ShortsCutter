


export interface SettingsState {
    maxTextLength: number
    strokeWidth: number
    linesCount: number
    strokeColor: string | null
    fontSize: number
    textColor: string | null
    textSize: number
    font: string | null
    isTexColorPickerVisible: boolean
    isBorderColorPickerVisible: boolean
}

export function initSettingsState(): SettingsState {
    return {
        maxTextLength: 20,
        strokeWidth: 0,
        linesCount: 1,
        strokeColor: null,
        font: null,
        textSize: 30,
        textColor: "#FFFFFF",
        isTexColorPickerVisible: false,
        isBorderColorPickerVisible: false,
        fontSize: 12
    }
}