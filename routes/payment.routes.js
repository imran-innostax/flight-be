const express = require('express')
const router = express.Router()
const payment = require('../controllers/payment.controllers')
router.post('/payment', payment.payment)
module.exports = router
