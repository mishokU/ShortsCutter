const db = require("../db");

const TIMEMARKS_TABLE_NAME = "timemarks"

module.exports = {
    getTimemarksByProjectId,
    addTimemark,
    deleteTimemark,
    updateTimemarkStartTime,
    updateTimemarkEndTime
}

async function getTimemarksByProjectId(projectId) {
    try {
        const data = await db.query(`SELECT * FROM ${TIMEMARKS_TABLE_NAME} WHERE project_id=$1 ORDER BY id ASC;`, [projectId]);
        return data.rows;
    } catch (e) {
        console.log(`Error in get timemarks from project: ${projectId} with error: ${e.message}`)
    }
}

async function addTimemark(projectId) {
    const result = await db.query(
        `
                INSERT INTO ${TIMEMARKS_TABLE_NAME}
                (project_id, start_time, end_time)
                VALUES (${projectId},'', '')
                RETURNING id
             `
    )
    return result.rows[0].id
}

async function deleteTimemark(timemarkId) {
    await db.query(`DELETE FROM ${TIMEMARKS_TABLE_NAME} WHERE id= $1`, [timemarkId])
}

async function updateTimemarkStartTime(timemarkId, startTime) {
    await db.query(`UPDATE ${TIMEMARKS_TABLE_NAME} SET start_time=$2 WHERE id=$1`, [timemarkId, startTime])

}

async function updateTimemarkEndTime(timemarkId, endTime) {
    await db.query(`UPDATE ${TIMEMARKS_TABLE_NAME} SET end_time=$2 WHERE id=$1`, [timemarkId, endTime])
}