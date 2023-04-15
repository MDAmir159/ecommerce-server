const PromiseModule = require("../helpers/Promise/PromiseModule");

const sizeQueries = {
    getAllSizes,
    addNewSize,
    updateSizeInformationQuery,
    deleteSizeById,
    deleteSizeByName
}

async function getAllSizes() {
    const sqlQuery = "SELECT * FROM size ";
    return PromiseModule.readData(sqlQuery);
}

async function addNewSize(inputArray) {
    // console.log(inputArray);
    const sqlQuery = "INSERT INTO size (name) VALUES (?)"
    return PromiseModule.createUpdateDelete(sqlQuery, inputArray);
}

async function updateSizeInformationQuery(inputObj) {
    const {sizeId, name} = inputObj
    const sqlQuery = `UPDATE size SET name = "${name}" WHERE size.id = ${sizeId}`
    return PromiseModule.readData(sqlQuery)
}

async function deleteSizeById(sizeId) {
    const sqlQuery = `DELETE FROM size WHERE size.id = ${sizeId}`
    return PromiseModule.readData(sqlQuery)
}

async function deleteSizeByName(sizeName){
    const sqlQuery = `DELETE FROM size WHERE size.name = "${sizeName}"`
    return PromiseModule.readData(sqlQuery)
}

module.exports = sizeQueries;