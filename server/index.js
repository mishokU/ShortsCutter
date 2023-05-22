const express = require('express')
const cors = require('cors')
const config = require('./config.js')

const app = express()

app
    .use(express.urlencoded())
    .use(express.json())
    .use(cors({credentials: true, origin: '*'}))

const mountRoutes = require('./routes')

mountRoutes(app)

app.listen(config.port, () => {
    console.log(`Sever is now listening at port ${config.port}`);
});