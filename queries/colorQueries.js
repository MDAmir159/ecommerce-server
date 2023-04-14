const PromiseModule = require("../helpers/Promise/PromiseModule");

const colorQueries = {
    getAllColors,
    addNewColor
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

module.exports = colorQueries;