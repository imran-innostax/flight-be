const express = require('express')
const router = express.Router()
const airports = require('../controllers/airports.controllers')
router.get('/airports', airports.getairportbycityname)
module.exports = router
