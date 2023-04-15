const express = require('express');
const { INTERNAL_SERVER_ERROR, OK, NOT_FOUND, CREATED, UNPROCESSABLE_ENTITY, NOT_MODIFIED } = require('../HTTPStatus');
const { getAllSizes, addNewSize, updateSizeInformationQuery, deleteSizeById, deleteSizeByName } = require('../queries/sizeQueries');
const routes = express.Router();

routes.get('/', async(req, res) => {
    try {
        const response = await getAllSizes()
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
        const response = await addNewSize(inputArray)
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

routes.patch('/', async (req, res) => {
    const {sizeId, name} = req.body
    // console.log(sizeId, name);
    if (sizeId == null || name == null) {
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "necessary information missing"
        })
    }
    const inputObj = {sizeId, name}
    try {
        const response = await updateSizeInformationQuery(inputObj)
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
})

routes.delete('/by_id', async (req, res) => {
    const {sizeId} = req.body
    if(sizeId == null){
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "necessary information missing"
        })
    }

    try {
        const response = await deleteSizeById(sizeId)
        if (!response) {
            return res.status(INTERNAL_SERVER_ERROR).json({message: "no response"})
        } else {
            return res.status(OK).json({
                message : "OK. successfully deleted"
            })
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

routes.delete('/by_name', async (req, res) => {
    const {sizeName} = req.body
    if(sizeName == null){
        return res.status(UNPROCESSABLE_ENTITY).json({
            message: "necessary information missing"
        })
    }

    try {
        const response = await deleteSizeByName(sizeName)
        if (!response) {
            return res.status(INTERNAL_SERVER_ERROR).json({message: "no response"})
        } else {
            return res.status(OK).json({
                message : "OK. successfully deleted"
            })
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})
module.exports = routes