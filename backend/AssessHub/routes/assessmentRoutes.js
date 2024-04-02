const express = require('express')
const router = express.Router()
const controller = require('../controllers/assessmentController')

router.get('/upcoming-assessments', controller.getUpcomingAssessments)
router.get('/ongoing-assessments', controller.getOngoingAssessments)
router.get('/assessment-questions/:assessmentId', controller.getAssessmentQuestions)

module.exports = router