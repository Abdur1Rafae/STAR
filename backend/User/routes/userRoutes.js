const express = require('express')
const router = express.Router()
const {requireAuth} = require('../authMiddleware')
const controller = require('../controllers/userController')

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/refresh', controller.refresh)
router.post('/logout', requireAuth, controller.logout)

module.exports = router