const express = require('express')
const router = express.Router()
const controller = require('../controllers/assessmentController')

router.get('/upcoming-assessments', controller.getUpcomingAssessments)
router.get('/ongoing-assessments', controller.getOngoingAssessments)

router.get('/begin-assessment/:sectionId/:assessmentId', controller.beginAssessment)
router.post('/submit-response/:responseId', controller.submitAssessment)


router.post('/demo-assessment', controller.demoAssessment)

module.exports = router