const express = require('express')
const router = express.Router()
const controller = require('../controllers/gradingController')

router.get('/summary/:assessmentId', controller.getQuestionSummary)
router.get('/responses/:assessmentId/:questionId', controller.getQuestionResponses)
router.put('/grade-response/:submissionId/:responseId', controller.gradeResponse)
router.put('/penalize-response/:responseId', controller.penalizeStudent)
router.put('/publish/:assessmentId', controller.publish)

router.get('/flagging-summary/:assessmentId', controller.getFlaggingSummary)
router.get('/candidate-violations/:responseId', controller.getStudentViolations)

module.exports = router