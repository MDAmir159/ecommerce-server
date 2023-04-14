const express = require('express');
const routes = express.Router();

const colorRoutes = require('./colorRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');

routes.use('/color', colorRoutes);
routes.use('/category', categoryRoutes);
routes.use('/product', productRoutes);

module.exports = routes;