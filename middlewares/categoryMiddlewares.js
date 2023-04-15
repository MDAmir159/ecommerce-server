const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, BAD_REQUEST, NOT_MODIFIED, CREATED } = require("../HTTPStatus");
const { getCategoryList, updateCategoryStatus, insertNewCategory, updateParentCategoryInformation, deleteCategory } = require("../queries/categoryQueries");

const productMiddlewares = {
    categoryAdjacencyList,
    updateCategoryStatusMiddleware,
    generateCategoryArray,
    categoryDescendantElements,
    addNewCategory,
    updateParentCategory,
    deleteCategoryById
}

async function categoryAdjacencyList(req, res, next) {
    let rawData = []
    let queue = []
    let parentMap = {}
    let visited = {}
    let formattedData = {}
    let categoryList = {}
    let categoryIdNameRelation = {}

    try {
        rawData = await getCategoryList()
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error:error})
    }
    
    rawData.forEach((item) => {
        formattedData[item.id] = {
            parent_id: item.parent_id,
            name: item.name,
            status_id : item.status_id
        }

        // will take only those who are valid ones 
        // thaz why checking the status_id too 
        if(item.status_id === 1 && item.parent_id === -1){
            queue.push(item.id)
        }
    })

    while(queue.length > 0) {
        const head = queue.shift()
        visited[head] = true
        if(formattedData[head].status_id === 1){
            categoryList[head] = []
            rawData.forEach(item => {
                if(item.parent_id === head && !visited[item.id]){
                    queue.push(item.id)
                }
            });
        }
    }

    rawData.forEach(item => {
        const {id, parent_id, name} = item
        if (categoryList[id]) {
            parentMap[id] = parent_id
            categoryIdNameRelation[id] = {name: item.name}
            if (categoryList.hasOwnProperty(parent_id) && parent_id !== -1) {
                
                categoryList[parent_id].push({id:id, name: name})        
            }
        }
        
    })

    req.categoryAdjacencyList = categoryList
    req.parentMap = parentMap
    req.categoryIdNameRelation = categoryIdNameRelation

    next()
}

async function updateCategoryStatusMiddleware(req, res) {
    const {categoryId, statusId} = req.body

    if(categoryId == null || statusId == null){
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "not enough information"
        })
    }

    try {
        const response = await updateCategoryStatus({categoryId, statusId})
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
        return res.status(INTERNAL_SERVER_ERROR).json({error:error})
    }
}

function generateCategoryArray(leaf_category, parentMap, categoryIdNameRelation) {    
    // console.log(params);
    let categoryArray = []
    let current_cat = leaf_category
    let status = true
    while (current_cat != -1){
        if(parentMap[current_cat]){
            categoryArray.push({
                id:current_cat,
                name: categoryIdNameRelation[current_cat].name
            })
            current_cat = parentMap[current_cat]
        } else {
            status = false
            break
        }
    }
    if(status){
        return categoryArray
    } else {
        return []
    }
}

function categoryDescendantElements(leaf_category, categoryAdjacencyList) {
    let descendantCategories = []
    let queue = []

    queue.push(leaf_category)
    while(queue.length > 0) {
        const head = queue.shift()
        if (categoryAdjacencyList[head]) {
            descendantCategories.push(head)
            categoryAdjacencyList[head].forEach(element => {
                queue.push(element.id)
            });
        }
    }

    return descendantCategories
}

async function addNewCategory(req, res) {
    const {
        name, parent_id, status_id
    } = req.body
    if (name == null || parent_id == null || status_id == null) {
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "missing necessary information"
        })
    }
    const inputArray = [[name, parseInt(parent_id), parseInt(status_id)]]
    try {
        const response = await insertNewCategory(inputArray);
        if (response) {
            return res.status(CREATED).json({
                message: "Created a new category"
            })
        } else {
            return res.status(INTERNAL_SERVER_ERROR).json({message:"no response after insertion request"})
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}

async function updateParentCategory(req, res) {
    const {
        targetParent, replacedParent
    } = req.body

    if (targetParent == null || replacedParent == null) {
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "missing necessary information"
        })
    }

    const inputObj = {targetParent, replacedParent}

    try {
        const response = await updateParentCategoryInformation(inputObj);
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
        return res.status(INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}

async function deleteCategoryById(req, res) {
    const {categoryId} = req.body
    // console.log(categoryId);
    if (categoryId == null ) {
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "missing necessary information"
        })
    }
    try {
        const response = await deleteCategory(categoryId);
        if (!response) {
            return res.status(INTERNAL_SERVER_ERROR).json({message: "no response"})
        } else {
            const targetParent = categoryId
            const replacedParent = -1
            const inputObj = {targetParent, replacedParent}
            const responseOfChangingParentCategory = await updateParentCategoryInformation(inputObj)
            if (!responseOfChangingParentCategory) {
                return res.status(INTERNAL_SERVER_ERROR).json({message: "no response"})
            } else if (responseOfChangingParentCategory.changedRows === 0){
                return res.status(NOT_MODIFIED).json({message: "Not changed "})
            } else {
                return res.status(OK).json({
                    message : "OK. successfully deleted and updated the database"
                })
            }
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}
module.exports = productMiddlewares