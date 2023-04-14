const { readData } = require("../helpers/Promise/PromiseModule")

const productQueries = {
    searchProductByName,
    getProductDetailsById,
    updateProductQuery,
    getAllProductsUnderCategoryQuery,
    getAllProductsUnderCategoryAndAttributesQuery
}
const baseQuery = "SELECT product.id AS id, product.name AS name, product.color_id AS color_id, join1.name AS color_name, product.size_id AS size_id, join2.name AS size_name, product.category_id AS leaf_category, join3.name AS leaf_category_name FROM product LEFT JOIN color AS join1 ON 1 LEFT JOIN size AS join2 ON 1 LEFT JOIN category AS join3 ON 1 WHERE product.color_id = join1.id AND product.size_id = join2.id AND product.category_id = join3.id"

async function searchProductByName(productName) {
    const sqlQuery = baseQuery + ` AND product.name = "${productName}"`
    return readData(sqlQuery)
}

async function getProductDetailsById(productId) {
    const sqlQuery = baseQuery + ` AND product.id = ${productId}`
    return readData(sqlQuery)
}

async function updateProductQuery(inputObj) {
    const {id, name, color_id, size_id, leaf_category} = inputObj
    const sqlQuery = `UPDATE product SET name = "${name}", color_id = ${color_id},  size_id = "${size_id}", category_id = ${leaf_category} WHERE product.id = ${id}`;
    return readData(sqlQuery)
}

async function getAllProductsUnderCategoryQuery(inputArray) {
    let extendedConditions = " AND ( 0";
    inputArray.forEach(element => {
        extendedConditions += ` OR product.category_id = ${element}`
    });
    extendedConditions += ")"
    const sqlQuery = baseQuery + extendedConditions
    return readData(sqlQuery)
}

async function getAllProductsUnderCategoryAndAttributesQuery(inputObj) {
    const {categoryInputArray, size_id, color_id} = inputObj
    let intermediateExtensions = ""
    if (size_id !== null) {
        intermediateExtensions += ` AND product.size_id = ${size_id}`
    }
    if (color_id !== null) {
        intermediateExtensions += ` AND product.color_id = ${color_id}`
    }
    let extendedConditions = " AND ( 0";
    
    categoryInputArray.forEach(element => {
        extendedConditions += ` OR product.category_id = ${element}`
    });
    extendedConditions += ")"
    const sqlQuery = baseQuery + intermediateExtensions + extendedConditions
    // console.log(sqlQuery);
    return readData(sqlQuery)
}
module.exports = productQueries