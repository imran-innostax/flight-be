const express = require('express')
const router = express.Router()
const book = require('../controllers/book.controllers')
router.post('/book', book.createbooking)

router.get('/book/:id', book.getbookingbyid)
router.patch('/book/:id', book.updatebooking)
module.exports = router
