const express = require('express')
const router = express.Router()
const search = require('../controllers/search.controllers')
router.post('/search', search.searchflights)
module.exports = router
