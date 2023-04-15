const { readData, createUpdateDelete } = require("../helpers/Promise/PromiseModule");

const categoryQueries = {
    getCategoryList,
    insertNewCategory,
    updateCategoryStatus,
    updateParentCategoryInformation,
    deleteCategory
}

async function getCategoryList(){
    const sqlQuery = "SELECT * FROM category";
    return readData(sqlQuery);
}

async function insertNewCategory(inputArray) {
    const sqlQuery = "INSERT INTO category (name, parent_id, status_id) VALUES (?)"
    return createUpdateDelete(sqlQuery, inputArray);
}

async function updateCategoryStatus(inputObject) {
    const {categoryId, statusId} = inputObject
    const sqlQuery = `UPDATE category SET status_id = ${statusId} WHERE category.id = ${categoryId}`
    return readData(sqlQuery)
}

async function updateParentCategoryInformation(inputObj) {
    const {targetParent, replacedParent} = inputObj
    const sqlQuery = `UPDATE category SET parent_id = ${replacedParent} WHERE category.parent_id = ${targetParent}`
    return readData(sqlQuery)
}

async function deleteCategory(categoryId) {
    const sqlQuery = `DELETE FROM category WHERE category.id = ${categoryId}`
    return readData(sqlQuery)
}

module.exports = categoryQueries;