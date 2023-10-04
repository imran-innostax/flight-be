const express = require('express')
const router = express.Router()
const book_flight = require('../controllers/book_flight.controllers')
router.post('/book-flight', book_flight.book)
module.exports = router
