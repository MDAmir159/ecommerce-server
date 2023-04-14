const express = require('express')
const { INTERNAL_SERVER_ERROR, OK } = require('../HTTPStatus')
const { categoryAdjacencyList, updateCategoryStatusMiddleware, generateCategoryArray } = require('../middlewares/categoryMiddlewares')
const router = express.Router()

router.get('/adjacencyList', categoryAdjacencyList, (req, res) => {
    const categoryList = req.categoryAdjacencyList
    res.status(OK).json(categoryList)
});

router.patch('/updateCategoryStatus', updateCategoryStatusMiddleware)


// router.get('/test', categoryAdjacencyList, generateCategoryArray)
module.exports = router