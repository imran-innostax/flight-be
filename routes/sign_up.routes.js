const express = require('express')
const router = express.Router()
const sign_up = require('../controllers/sign_up.controllers')
router.post('/sign-up', sign_up.signup)
module.exports = router
