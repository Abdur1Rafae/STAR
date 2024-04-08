const express = require('express')
const router = express.Router()
const controller = require('../controllers/registeryController')

router.post('/manage', controller.manage)
router.post('/register', controller.register)
router.post('/unregister', controller.unregister)

module.exports = router