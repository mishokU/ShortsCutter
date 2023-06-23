const {Dropbox} = require("dropbox");
const {Router} = require("express");

const filesRouter = new Router()

module.exports = filesRouter

filesRouter.get('/files', (request, result) => {
    const token = request.query.token
    let path = request.query.folder
    path = path.replaceAll('Dropbox', '')
    const dbx = new Dropbox({accessToken: token});
    dbx.filesListFolder({path: path, include_media_info: true})
        .then((response) => {
            result.status(200).json({
                success: true,
                files: response.result.entries
            })
        })
        .catch((error) => {
            result.status(401).json({
                success: false,
                status: error.status,
                tag: error.error.error[".tag"]
            })
        });
});

filesRouter.get('/file', (request, result) => {
    const token = request.query.token
    let fileId = request.query.fileId
    const dbx = new Dropbox({accessToken: token});
    dbx.filesGetMetadata({path: fileId, include_media_info: true})
        .then((responseMeta) => {
            dbx.filesGetTemporaryLink({path: fileId})
                .then((response) => {
                    result.status(200).json({
                        success: true,
                        type: responseMeta.result.media_info.metadata[".tag"],
                        fileLink: response.result.link
                    })
                })
                .catch((error) => {
                    result.status(200).json({
                        success: false,
                        status: error.status,
                        tag: error.error
                    })
                });
        }).catch((error) => {
        result.status(200).json({
            success: false,
            status: error.status,
            tag: error.error
        })
    })
});