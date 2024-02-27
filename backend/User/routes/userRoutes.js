const express = require('express')
const router = express.Router()
const {requireAuth} = require('../authMiddleware')
const controller = require('../controllers/userController')

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/refresh', controller.refresh)
router.post('/logout', requireAuth, controller.logout)
router.post('/delete-account', requireAuth, controller.deleteAccount)
router.post('/update-profile', requireAuth, controller.updateProfile)
router.post('/verify-otp', controller.verifyOTP)
router.post('/reset-password', controller.resetPassword)
router.get('/verify-email/:token', controller.verifyEmail)
router.post('/forgot-password', controller.forgotPassword)

module.exports = router