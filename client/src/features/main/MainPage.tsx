import useViewModel from "./MainViewModel"
import {buttonThemeFitBig} from "../../ui/Themes";
import {ProjectItem} from "./project/ProjectItem";
import {Project} from "./MainPageState";
import {EmptyWidget} from "../../ui/widgets/EmptyWidget";
import {LoadingWidget} from "../../ui/widgets/LoadingWidget";
import {ErrorWidget} from "../../ui/widgets/ErrorWidget";

export function MainPage() {
    const {state, onCreateProjectClick, onProjectClick} = useViewModel()
    return <div className="h-full  overflow-y-hidden">
        <div className="p-32 h-full">
            <div className="flex justify-between">
                <h1 className="text-2xl text-white">Project it depends on computer folder <br /> with name
                    "ShortsCutter"</h1>
                <button
                    onClick={onCreateProjectClick}
                    className={buttonThemeFitBig + ' animate-bounce hover:animate-none'}
                >Create project
                </button>
            </div>
            {state.isEmptyProjects && <EmptyWidget text={"Empty projects"} />}
            {state.isLoading && <LoadingWidget />}
            {state.error !== null && <ErrorWidget error={state.error} />}
            <div className="overflow-y-auto scrollbar max-h-[calc(100vh-300px)] mt-16 pb-16">
                <div className="pr-8 grid grid-cols-3 gap-16 w-fit">
                    {state.projects.length !== 0 && state.projects.map((project: Project) => <ProjectItem
                        onProjectClick={onProjectClick}
                        project={project} />)}
                </div>
            </div>
        </div>
    </div>
}