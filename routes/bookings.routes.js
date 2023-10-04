const express = require('express')
const router = express.Router()
const bookings = require('../controllers/bookings.controllers')
router.get('/bookings', bookings.bookings)
module.exports = router
