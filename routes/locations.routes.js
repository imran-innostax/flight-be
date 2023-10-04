const express = require('express')
const router = express.Router()
const locations = require('../controllers/locations.controllers')
router.get('/locations', locations.locations)
module.exports = router
