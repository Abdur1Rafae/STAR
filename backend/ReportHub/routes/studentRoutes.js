const express = require('express')
const router = express.Router()
const controller = require('../controllers/studentController')

router.get('/classes', controller.getEnrolledClasses)
router.get('/classes/overview/:sectionId', controller.getClassOverview)
router.get('/classes/assessment-report/:responseId', controller.getAssessmentReport)
router.get('/classes/assessment-submission/:responseId', controller.getAssessmentSubmission)

module.exports = router