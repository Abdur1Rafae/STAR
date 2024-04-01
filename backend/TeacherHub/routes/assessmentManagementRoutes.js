const express = require('express')
const router = express.Router()
const controller = require('../controllers/assessmentManagementController')

router.post('/new-assessment', controller.createAssessment)
router.delete('/delete-assessment/:assessmentId', controller.deleteAssessment)
router.put('/update-assessment/:assessmentId', controller.updateAssessment)
router.get('/scheduled-assessments', controller.getScheduledAssessments)
router.get('/assessment-details/:assessmentId', controller.getAssessmentDetails)

module.exports = router