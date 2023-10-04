const express = require('express')
const router = express.Router()
const create = require('../controllers/create.controllers')
router.post('/create', create.createmongo)
module.exports = router
