const auth = require('./auth')
const media = require('./files')
const projects = require('./projects')
const timemarks = require('./timemarks')
const editor = require('./editor')

module.exports = app => {
    app.use('/auth', auth)
    app.use('/media', media)
    app.use('/projects', projects)
    app.use('/timemarks', timemarks)
    app.use('/editor', editor)
}