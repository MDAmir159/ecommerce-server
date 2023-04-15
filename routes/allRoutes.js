const express = require('express');
const routes = express.Router();

const colorRoutes = require('./colorRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const sizeRoutes = require('./sizeRoutes')

routes.use('/color', colorRoutes);
routes.use('/category', categoryRoutes);
routes.use('/product', productRoutes);
routes.use('/size', sizeRoutes);

module.exports = routes;