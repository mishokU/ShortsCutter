const {Router} = require("express");
const {Dropbox} = require("dropbox");
const config = require('../config')

const userRouter = new Router()

module.exports = userRouter

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const dropBoxConfig = {
    fetch,
    clientId: 'hhh4zi4m0mbwbbt',
    clientSecret: 'ea5mx071obhjm8m',
};

const dbx = new Dropbox(dropBoxConfig);

const redirectUri = `http://${config.hostname}:${config.port}/auth/credentials`;

userRouter.get('/login', (request, result) => {
    dbx.auth.getAuthenticationUrl(
        redirectUri,
        null,
        'code',
        'offline',
        null,
        'none',
        false
    ).then((authUrl) => {
        result.status(200).json({
            success: true,
            authUrl: authUrl
        })
    }).catch((error) => console.log(error));
});

userRouter.get('/credentials', (request, result) => { // eslint-disable-line no-unused-vars
    const {code} = request.query;
    dbx.auth
        .getAccessTokenFromCode(redirectUri, code)
        .then((token) => {
            dbx.auth.setRefreshToken(token.result.refresh_token);
            dbx.usersGetCurrentAccount()
                .then((response) => {
                    console.log('response', response);
                    result.redirect(`http://localhost:3000/main?token=${token.result.access_token}`)
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});