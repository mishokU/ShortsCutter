const {Router} = require("express");
const {getToken} = require("../utils/Utils");
const timemarksController = require("../controllers/TimemarksController")
const userController = require("../controllers/UserController")

const timemarksRouter = new Router()

module.exports = timemarksRouter

timemarksRouter.post('/create', (request, result) => {
    return createTimemark(request, result)
})

timemarksRouter.delete('/delete', (request, result) => {
    return deleteTimemark(request, result)
})

timemarksRouter.get('/getAll', (request, result) => {
    return getAllTimemarks(request, result)
})

timemarksRouter.post('/updateStartTime', (request, result) => {
    return updateTime(request, result, true)
})

timemarksRouter.post('/updateEndTime', (request, result) => {
    return updateTime(request, result, false)
})

async function updateTime(request, result, isStartTime) {
    try {

        const {timemarkId, time} = request.body

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        if (user !== undefined && timemarkId !== undefined && time !== undefined) {

            if (isStartTime) {
                await timemarksController.updateTimemarkStartTime(timemarkId, time)
            } else {
                await timemarksController.updateTimemarkEndTime(timemarkId, time)
            }

            result.status(200).json({
                success: true
            })

        } else {
            result.status(200).json({
                success: false,
                message: "User not auth!"
            })
        }

    } catch (e) {
        const message = "Error in updating start time: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getAllTimemarks(request, result) {
    try {

        const projectId = request.query.projectId

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        if (user !== undefined && projectId !== undefined) {
            const timemarks = await timemarksController.getTimemarksByProjectId(projectId)
            console.log(timemarks)
            result.status(200).json({
                success: true,
                timemarks: timemarks
            })
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


async function deleteTimemark(request, result) {
    try {

        const timemarkId = request.query.timemarkId

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        if (user !== undefined && timemarkId !== undefined) {
            await timemarksController.deleteTimemark(timemarkId)
            result.status(200).json({
                success: true,
                message: "Timemark deleted!"
            })
        } else {
            result.status(200).json({
                success: false,
                message: "User not auth!"
            })
        }
    } catch (e) {
        const message = "Error in deleting project: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function createTimemark(request, result) {
    try {

        const {projectId} = request.body

        const token = getToken(request)
        const user = await userController.getUserByToken(token)

        if (user !== undefined && projectId !== undefined) {
            const timemarkId = await timemarksController.addTimemark(projectId)
            console.log(timemarkId)
            result.status(200).json({
                success: true,
                timemarkId: timemarkId
            })

        } else {
            result.status(200).json({
                success: false,
                message: "User not auth!"
            })
        }

    } catch (e) {
        const message = "Error in create timemark: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}