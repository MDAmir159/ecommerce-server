const express = require('express');
const { INTERNAL_SERVER_ERROR, OK, NOT_FOUND, CREATED } = require('../HTTPStatus');
const { getAllColors, addNewColor } = require('../queries/colorQueries');
const routes = express.Router();

routes.get('/', async(req, res) => {
    try {
        const response = await getAllColors()
        return res.status(OK).json({
            data : response
        })
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

routes.post('/', async(req, res) => {
    const name = req.body.name
    // console.log(req.body);
    const inputArray = [name]
    try {
        const response = await addNewColor(inputArray)
        if(!response) {
            return res.status(INTERNAL_SERVER_ERROR).json({
                message: "no response from database"
            })
        } else {
            return res.status(CREATED).json({
                message: "CREATED"
            })
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})
module.exports = routes