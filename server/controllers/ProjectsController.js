const db = require("../db");

const PROJECTS_TABLE_NAME = "projects"

module.exports = {
    createProject,
    getUserProjects,
    getUserProject,
    deleteProject,
    updateProjectVideo,
    updateProjectName
}

async function getUserProject(projectId) {
    try {
        const data = await db.query(`SELECT * FROM ${PROJECTS_TABLE_NAME} WHERE id=$1;`, [projectId]);
        return data.rows[0];
    } catch (e) {
        console.log("Error in get user projects: " + e.message)
    }
}

async function getUserProjects(userId) {
    try {
        const data = await db.query(`SELECT * FROM ${PROJECTS_TABLE_NAME} WHERE user_id=$1;`, [userId]);
        return data.rows;
    } catch (e) {
        console.log("Error in get user projects: " + e.message)
    }
}

async function createProject(userId, date) {
    const result = await db.query(
        `
                INSERT INTO ${PROJECTS_TABLE_NAME}
                (name, user_id, date, dropbox_uid)
                VALUES ('',${userId}, '${date}', '')
                RETURNING id
             `
    )
    return result.rows[0].id
}

async function deleteProject(projectId) {
    await db.query(`DELETE FROM ${PROJECTS_TABLE_NAME} WHERE id= $1`, [projectId])
}

async function updateProjectName(projectId, name) {
    try {

        await db.query(`UPDATE ${PROJECTS_TABLE_NAME} SET name=$2 WHERE id=$1`, [projectId, name])

    } catch (e) {
        console.log(`Error in updating db project name! ${projectId} ${e.message}`)
    }
}

async function updateProjectVideo(projectId, videoUrl) {
    try {

        await db.query(`UPDATE ${PROJECTS_TABLE_NAME} SET dropbox_uid=$2 WHERE id=$1`, [projectId, videoUrl])

    } catch (e) {
        console.log(`Error in updating db project video url! ${projectId} ${e.message}`)
    }
}