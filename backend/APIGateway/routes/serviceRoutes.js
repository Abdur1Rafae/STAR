const express = require('express')
const router = express.Router()

const controller = require('../controllers/serviceController')

router.all(/^\/([^\/]+)\/(.*)/, controller.redirect)

module.exports = router


