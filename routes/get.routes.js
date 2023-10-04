const express = require('express')
const router = express.Router()
const get = require('../controllers/get.controllers')
router.get('/get', get.getdata)
module.exports = router
