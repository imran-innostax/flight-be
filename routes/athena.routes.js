const express = require('express')
const router = express.Router()
const athena = require('../controllers/athena.controllers')
router.get('/athena', athena.athena)
module.exports = router
