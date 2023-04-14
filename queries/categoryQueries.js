const { readData } = require("../helpers/Promise/PromiseModule");

const categoryQueries = {
    getCategoryList,
    updateCategoryStatus
}

async function getCategoryList(){
    const sqlQuery = "SELECT * FROM category";
    return readData(sqlQuery);
}

async function updateCategoryStatus(inputObject) {
    const {categoryId, statusId} = inputObject
    const sqlQuery = `UPDATE category SET status_id = ${statusId} WHERE category.id = ${categoryId}`
    return readData(sqlQuery)
}

module.exports = categoryQueries;