const express = require('express')
const router = express.Router()
const payment_methods = require('../controllers/payment_methods.controllers')
router.post('/payment-methods', payment_methods.paymentmethods)
module.exports = router
