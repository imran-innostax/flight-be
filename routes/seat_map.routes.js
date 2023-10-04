const express = require('express')
const router = express.Router()
const seat_map = require('../controllers/seat_map.controllers')
router.post('/seat-map', seat_map.seatmap)
module.exports = router
