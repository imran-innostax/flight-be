const express = require('express')
const router = express.Router()
const price = require('../controllers/price.controllers')
router.post('/price', price.price)
module.exports = router
