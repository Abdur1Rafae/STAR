const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/signup', controller.signup)
router.post('/authenticate', controller.authenticate)
router.delete('/delete-account', controller.deleteAccount)
router.put('/update-profile', controller.updateProfile)
router.put('/reset-password', controller.resetPassword)
router.post('/forgot-password', controller.forgotPassword)

module.exports = router