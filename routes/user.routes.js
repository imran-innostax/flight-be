const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controllers')
router.get('/user/bookings', user.getbookingsbyuser)
module.exports = router
