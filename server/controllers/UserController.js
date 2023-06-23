const db = require("../db");

module.exports = {
    getUserByToken,
    getUserById,
    getUserByEmail,
    updateToken,
    updateUser,
    createOrUpdateUser,
    deleteAccount,
    isUserExists
}

async function getUserByToken(token) {
    try {
        const data = await db.query(`SELECT * FROM users WHERE token=$1;`, [token])
        return data.rows[0]
    } catch (e) {
        console.log("Get user by token error: " + e.message)
    }
}


async function getUserById(userId) {
    try {
        const data = await db.query(`SELECT * FROM users WHERE id=$1;`, [userId])
        return data.rows[0]
    } catch (e) {
        console.log("Get user by id error: " + e.message)
    }
}

async function getUserByEmail(email) {
    try {
        const data = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
        return data.rows[0];
    } catch (e) {
        console.log("Error in get user by email: " + e.message)
    }
}

async function updateToken(token, email) {
    await db.query(`UPDATE users SET token=$1 WHERE email=$2;`, [token, email])
}

async function updateUser(name, surname, description, website, location, language, avatar, token) {
    await db.query(`UPDATE users SET 
            name=$2,
            surname=$3,
            website=$4,
            location=$5,
            language=$6
        WHERE token=$1;`, [token, name, surname, website, location, language]);
    return "Данные обновлены"
}

async function isUserExists(email) {
    const user = await db.query(`SELECT * FROM users WHERE email= $1`, [email])
    return user.rows.length !== 0
}

async function createOrUpdateUser(email, token) {
    const user = await this.getUserByEmail(email)
    console.log(user)
    if (user === undefined) {
        await db.query(
            `
                INSERT INTO users
                (name, surname, website, email, token, location, language)
                VALUES ('','', '', '${email}', '${token}', '', '')
             `
        )
    } else {
        await this.updateToken(token, email)
    }
}

async function deleteAccount(token) {
    try {
        await db.query(`DELETE FROM users WHERE token= $1`, [token])
    } catch (e) {
        console.log("Error in deleting account: " + e.message)
    }
}