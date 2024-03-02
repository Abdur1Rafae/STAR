const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.post('/refresh', controller.refresh)
router.post('/logout', controller.logout)
router.post('/delete-account', controller.deleteAccount)
router.post('/update-profile', controller.updateProfile)
router.post('/verify-otp', controller.verifyOTP)
router.post('/reset-password', controller.resetPassword)
router.get('/verify-email/:token', controller.verifyEmail)
router.post('/forgot-password', controller.forgotPassword)

module.exports = router