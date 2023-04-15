const PromiseModule = require("../helpers/Promise/PromiseModule");

const colorQueries = {
    getAllColors,
    addNewColor,
    updateColorInformationQuery,
    deleteColorById,
    deleteColorByName
}

async function getAllColors() {
    const sqlQuery = "SELECT * FROM color ";
    return PromiseModule.readData(sqlQuery);
}

async function addNewColor(inputArray) {
    // console.log(inputArray);
    const sqlQuery = "INSERT INTO color (name) VALUES (?)"
    return PromiseModule.createUpdateDelete(sqlQuery, inputArray);
}

async function updateColorInformationQuery(inputObj) {
    const {colorId, name} = inputObj
    const sqlQuery = `UPDATE color SET name = "${name}" WHERE color.id = ${colorId}`
    return PromiseModule.readData(sqlQuery)
}

async function deleteColorById(colorId) {
    const sqlQuery = `DELETE FROM color WHERE color.id = ${colorId}`
    return PromiseModule.readData(sqlQuery)
}

async function deleteColorByName(colorName){
    const sqlQuery = `DELETE FROM color WHERE color.name = "${colorName}"`
    return PromiseModule.readData(sqlQuery)
}

module.exports = colorQueries;