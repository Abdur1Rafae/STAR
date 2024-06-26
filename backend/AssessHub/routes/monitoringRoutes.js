const express = require('express')
const router = express.Router()
const controller = require('../controllers/monitoringController')

router.get('/monitor-assessment/:assessmentId', controller.getMonitoringDetails)
router.put('/flag-candidate/:responseId', controller.flagCandidate)

module.exports = router