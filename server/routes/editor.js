const {Router} = require("express");
const {getToken} = require("../utils/Utils");
const userController = require("../controllers/UserController")
const projectsController = require("../controllers/ProjectsController")
const Promise = require("bluebird");
const {Dropbox} = require("dropbox");

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

const downloadRouter = new Router()

module.exports = downloadRouter

downloadRouter.post('/download', (request, result) => {
    return downloadFile(request, result)
})

async function downloadFile(request, result) {
    try {

        const {projectId} = request.body

        const token = getToken(request)

        const user = await userController.getUserByToken(token)

        if (user !== undefined && projectId !== undefined) {

            const project = await projectsController.getUserProject(projectId)
            const dbx = new Dropbox({accessToken: token});

            dbx.filesGetTemporaryLink({path: project.dropbox_uid})
                .then((response) => {
                    // ffmpeg(response.result.link)
                    //     .setStartTime('00:00:03')
                    //     .setDuration(10)
                    //     .output({
                    //
                    //     })
                    //     .on('end', function (err) {
                    //         if (!err) {
                    //             console.log('conversion Done')
                    //         }
                    //     })
                    //     .on('error', err => console.log('error: ', err))
                    //     .run()

                })
                .catch((error) => {
                    result.status(200).json({
                        success: false,
                        status: error.status,
                        tag: error.error
                    })
                });
        } else {
            result.status(200).json({
                success: false,
                message: "User not auth!"
            })
        }
    } catch (e) {
        const message = "Error in editing video: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}