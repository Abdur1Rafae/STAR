const express = require('express')
const router = express.Router()
const controller = require('../controllers/assessmentController')

//Teachers
router.post('/new-assessment', controller.createAssessment)
router.delete('/delete-assessment', controller.deleteAssessment)
router.put('/update-assessment', controller.updateAssessment)
router.get('/scheduled-assessments', controller.getScheduledAssessments)
router.get('/published-assessments', controller.getPublishedAssessments)
//Students
router.get('/upcoming-assessments', controller.getUpcomingAssessments)
router.get('/ongoing-assessments', controller.getOngoingAssessments)
//Both
router.get('/assessment-details', controller.getAssessmentDetails)

module.exports = router