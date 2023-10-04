const express = require('express')
const router = express.Router()
const logs = require('../controllers/logs.controllers')
router.get('/logs', logs.logsdetails)
module.exports = router
