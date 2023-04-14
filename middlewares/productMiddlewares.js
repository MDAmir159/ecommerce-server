const { UNPROCESSABLE_ENTITY, OK, INTERNAL_SERVER_ERROR, UNAVAILABLE_FOR_LEGAL_REASONS, NOT_MODIFIED } = require("../HTTPStatus")
const { searchProductByName, getProductDetailsById, updateProductQuery, getAllProductsUnderCategoryQuery, getAllProductsUnderCategoryAndAttributesQuery } = require("../queries/productQueries")
const { generateCategoryArray, categoryDescendantElements } = require("./categoryMiddlewares")

const productMiddlewares = {
    searchProductByNameMiddleware,
    getProductByIdMiddleware,
    updateProduct,
    getProductListUnderCategory,
    getProductListUnderCategoryAndAttributes
}

async function searchProductByNameMiddleware(req, res) {
    const {productName} = req.body
    const {parentMap, categoryIdNameRelation} = req
    
    if (!productName) {
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "productName not provided"
        })
    }

    try {
        const response = await searchProductByName(productName)
        const result = response.map(item => {
            const categoryArray = generateCategoryArray(item.leaf_category, parentMap, categoryIdNameRelation)
            // console.log(categoryArray);
            if (categoryArray.length !== 0) {
                return {...item, categoryArray}
            }
        });

        return res.status(OK).json(result)
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

async function getProductByIdMiddleware(req, res) {
    const {productId} = req.body
    const {parentMap, categoryIdNameRelation} = req
    // console.log(parentMap, categoryIdNameRelation);
    if(!productId){
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "productId not found"
        })
    }
    try {
        let [response] = await getProductDetailsById(productId)
        const categoryArray = generateCategoryArray(response.leaf_category, parentMap, categoryIdNameRelation)
        if (categoryArray.length !== 0) {
            response =  {...response, categoryArray}
            return res.status(OK).json(response)
        } else {
            return res.status(UNAVAILABLE_FOR_LEGAL_REASONS).json({
                message: "this product is currently offline"
            })
        }
        
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

async function updateProduct(req, res) {
    const {
        id,
        name,
        color_id,
        size_id,
        leaf_category
    } = req.body 

    if(id == null || name == null || color_id == null || size_id == null || leaf_category == null){
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "necessary information missing"
        })
    }

    const inputObj = {id, name, color_id, size_id, leaf_category}

    try {
        const response = await updateProductQuery(inputObj);
        if (!response) {
            return res.status(INTERNAL_SERVER_ERROR).json({message: "no response"})
        } else if (response.changedRows === 0){
            return res.status(NOT_MODIFIED).json({message: "Not changed "})
        } else {
            return res.status(OK).json({
                message : "OK. successfully updated"
            })
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

async function getProductListUnderCategory(req, res) {
    const {categoryId} = req.body
    const {parentMap, categoryIdNameRelation, categoryAdjacencyList} = req
    
    if (categoryId === null) {
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "categoryId not found"
        })
    }

    const coveredCategories = generateCategoryArray(categoryId, parentMap, categoryIdNameRelation)

    if (coveredCategories.length === 0) {
        return res.status(UNAVAILABLE_FOR_LEGAL_REASONS).json({
            message: "this category is currently offline"
        })
    }

    const descendantCategories = categoryDescendantElements(parseInt(categoryId), categoryAdjacencyList);

    try {
        const response = await getAllProductsUnderCategoryQuery(descendantCategories)
        return res.status(OK).json(response)
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

async function getProductListUnderCategoryAndAttributes(req, res) {
    const {categoryId, size_id, color_id} = req.body
    const {parentMap, categoryIdNameRelation, categoryAdjacencyList} = req
    
    if (categoryId === null) {
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "categoryId not found"
        })
    }

    const coveredCategories = generateCategoryArray(categoryId, parentMap, categoryIdNameRelation)

    if (coveredCategories.length === 0) {
        return res.status(UNAVAILABLE_FOR_LEGAL_REASONS).json({
            message: "this category is currently offline"
        })
    }

    const descendantCategories = categoryDescendantElements(parseInt(categoryId), categoryAdjacencyList);
    const categoryInputArray = descendantCategories
    const inputObj = {categoryInputArray, size_id, color_id}
    try {
        const response = await getAllProductsUnderCategoryAndAttributesQuery(inputObj)
        return res.status(OK).json(response)
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
}

module.exports = productMiddlewares