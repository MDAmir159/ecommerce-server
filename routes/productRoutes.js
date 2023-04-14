const express = require('express');
const { searchProductByNameMiddleware, getProductByIdMiddleware, updateProduct, getProductListUnderCategory, getProductListUnderCategoryAndAttributes } = require('../middlewares/productMiddlewares');
const { categoryAdjacencyList } = require('../middlewares/categoryMiddlewares');
const router = express.Router();

router.get('/search_by_name', categoryAdjacencyList , searchProductByNameMiddleware);

router.get('/product_details', categoryAdjacencyList, getProductByIdMiddleware)

router.get('/productlist_by_category', categoryAdjacencyList, getProductListUnderCategory);

router.get('/productlist_by_category_and_attributes', categoryAdjacencyList, getProductListUnderCategoryAndAttributes);

router.patch('/update_product', updateProduct);

module.exports = router