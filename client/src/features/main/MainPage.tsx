import useViewModel from "./MainViewModel"

export function MainPage() {
    const {state} = useViewModel()

    return <div>
        <h1>Main page here!</h1>
    </div>
}