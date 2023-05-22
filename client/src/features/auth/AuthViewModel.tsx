import {useLoginMutation} from "../../data/dropbox/DropboxLoginApi";

export default function AuthViewModel() {

    const [login] = useLoginMutation()

    const onLoginClick = async () => {
        try {
            const data = await login().unwrap()
            window.open(data.authUrl, "_self");
        } catch (e){
            console.log(e)
        }
    }

    return {
        onLoginClick
    }

}