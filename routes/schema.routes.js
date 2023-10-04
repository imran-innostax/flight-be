const express = require('express')
const router = express.Router()
const schema = require('../controllers/schema.controllers')
router.post('/schema', schema.schema)
module.exports = router
