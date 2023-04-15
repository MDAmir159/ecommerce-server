const express = require('express')
const { INTERNAL_SERVER_ERROR, OK } = require('../HTTPStatus')
const { categoryAdjacencyList, updateCategoryStatusMiddleware, generateCategoryArray, addNewCategory, updateParentCategory, deleteCategoryById } = require('../middlewares/categoryMiddlewares')
const router = express.Router()

router.get('/adjacencyList', categoryAdjacencyList, (req, res) => {
    const categoryList = req.categoryAdjacencyList
    res.status(OK).json(categoryList)
});

router.post('/add_category', addNewCategory);

router.patch('/updateCategoryStatus', updateCategoryStatusMiddleware)

router.patch('/update_parentCategory', updateParentCategory);

router.delete('/delete_category', deleteCategoryById)
// router.get('/test', categoryAdjacencyList, generateCategoryArray)
module.exports = router