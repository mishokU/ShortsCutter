const {Router} = require("express");
const {getToken} = require("../utils/Utils");
const projectsController = require("../controllers/ProjectsController")
const userController = require("../controllers/UserController")
const Promise = require("bluebird");
const {Dropbox} = require("dropbox");

const projectsRouter = new Router()

module.exports = projectsRouter

projectsRouter.post('/create', (request, result) => {
    return createProject(request, result)
})

projectsRouter.get('/getAll', (request, result) => {
    return getAllProjects(request, result)
})

projectsRouter.get('/getSingle', (request, result) => {
    return getSingle(request, result)
})

projectsRouter.post('/updateName', (request, result) => {
    return updateProjectName(request, result)
})

projectsRouter.post('/updateVideo', (request, result) => {
    return updateProjectVideo(request, result)
})

projectsRouter.delete('/delete', (request, result) => {
    return deleteProject(request, result)
})

async function updateProjectVideo(request, result) {
    try {

        const {projectId, videoUrl} = request.body

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        if (user !== undefined && projectId !== undefined && videoUrl !== undefined) {
            await projectsController.updateProjectVideo(projectId, videoUrl)
            result.status(200).json({
                success: true,
                name: videoUrl
            })
        } else {
            result.status(200).json({
                success: false,
                message: "User not auth!"
            })
        }
    } catch (e) {
        const message = "Error in update project video url: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function updateProjectName(request, result) {
    try {

        const {projectId, name} = request.body

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        if (user !== undefined && projectId !== undefined && name !== undefined) {
            await projectsController.updateProjectName(projectId, name)
            result.status(200).json({
                success: true,
                name: name
            })
        } else {
            result.status(200).json({
                success: false,
                message: "User not auth!"
            })
        }
    } catch (e) {
        const message = "Error in update project name: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getSingle(request, result) {
    try {

        const projectId = request.query.projectId

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        if (user !== undefined) {
            const project = await projectsController.getUserProject(projectId)
            if (project.dropbox_uid !== "") {
                const dbx = new Dropbox({accessToken: token});
                const response = await dbx.filesGetMetadata({path: project.dropbox_uid, include_media_info: true})
                result.status(200).json({
                    success: true,
                    projectName: project.name,
                    file: response.result,
                })
            } else {
                result.status(200).json({
                    success: true,
                    projectName: project.name
                })
            }
        } else {
            result.status(200).json({
                success: false,
                message: "User not auth!"
            })
        }
    } catch (e) {
        const message = "Error in get all project: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getAllProjects(request, result) {
    try {

        const token = getToken(request)

        const user = await userController.getUserByToken(token)
        const projects = await projectsController.getUserProjects(user.id)

        const projectsWithPreview = await Promise.map(projects, async (project) => {
            let preview = project.dropbox_uid
            // if (project.dropbox_uid !== "") {
            //     const response = await dbx.filesGetTemporaryLink({path: project.dropbox_uid})
            //     preview = response.result.link
            // }
            return {
                id: project.id,
                projectName: project.name,
                date: project.date,
                timemarks: project.timemarks,
                videoPreview: preview
            }
        })

        result.status(200).json({
            success: true,
            projects: projectsWithPreview
        })

    } catch (e) {
        const message = "Error in get all project: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function createProject(request, result) {
    try {

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        const datetime = new Date();
        const date = datetime.toISOString().slice(0, 10)

        const projectId = await projectsController.createProject(user.id, date)

        result.status(200).json({
            success: true,
            projectId: projectId,
            message: "Project created!"
        })

    } catch (e) {
        const message = "Error in creating project: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function deleteProject(request, result) {
    try {

        const projectId = request.query.projectId

        await projectsController.deleteProject(projectId)

        result.status(200).json({
            success: true,
            message: "Project deleted!"
        })

    } catch (e) {
        const message = "Error in deleting project: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}