import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {initMainPageState, MainPageState} from "./MainPageState";
import {useLocation, useNavigate} from "react-router-dom";
import {ShortsCutterRoutes} from "../../navigation/ShortsCutterRoutes";
import {useCreateProjectMutation, useGetProjectsMutation} from "../../data/api/shortsCutter/ProjectsApi";
import {GetProjectsResponse} from "../../data/models/projects/GetProjectsResponse";
import {ProjectsUiConverter} from "./converter/ProjectsUiConverter";
import {ErrorConverter} from "../../domain/errors/ErrorConverter";

export default function MainViewModel() {

    const [cookies] = useCookies(['folderPath']);
    const [, setToken] = useCookies(['token']);

    const [state, setState] = useState<MainPageState>(initMainPageState(cookies.folderPath))

    const [createProject] = useCreateProjectMutation()
    const [getProjects] = useGetProjectsMutation()

    const errorConverter = new ErrorConverter()
    const uiConverter = new ProjectsUiConverter()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token')
        if (token) {
            setToken('token', query.get('token'))
        }
        if (!cookies.folderPath) {
            navigate(ShortsCutterRoutes.settings)
        }

        async function loadProjects() {
            return await getProjects().unwrap()
        }

        loadProjects()
            .then(async (response: GetProjectsResponse) => {
                if (response.success) {
                    const projects = await uiConverter.convert(response)
                    setState({
                        ...state, isEmptyProjects: projects.length === 0, isLoading: false, projects: projects
                    })
                } else {
                    setState({
                        ...state, isEmptyProjects: false, isLoading: false, error: errorConverter.convertMessage(response.message)
                    })
                }
            })
            .catch((error) => {
                setState({
                    ...state, isLoading: false, error: errorConverter.convertStatus(error.status)
                })
            })

    }, [])

    const onCreateProjectClick = async () => {
        try {
            const response = await createProject().unwrap()
            if (response.success) {
                navigate(ShortsCutterRoutes.create + "/" + response.projectId)
            } else {
                setState({
                    ...state, error: errorConverter.convertMessage(response.message)
                })
            }
        } catch (error: any) {
            setState({
                ...state, error: error.message
            })
        }
    }

    const onProjectClick = (projectId: number) => {
        navigate(ShortsCutterRoutes.create + "/" + projectId)
    }

    return {
        state, onCreateProjectClick, onProjectClick
    }

}