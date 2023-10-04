const express = require('express')
const router = express.Router()
const stripewebhook = require('../controllers/stripewebhook.controllers')
router.post('/stripewebhook', stripewebhook.stripe)
module.exports = router
