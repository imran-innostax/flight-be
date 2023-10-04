const express = require('express')
const router = express.Router()
const athena_add = require('../controllers/athena_add.controllers')
router.get('/athena-add', athena_add.storeathna)
module.exports = router
