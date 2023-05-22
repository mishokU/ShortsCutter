const auth = require('./auth')
const media = require('./files')

module.exports = app => {
    app.use('/auth', auth)
    app.use('/media', media)
}