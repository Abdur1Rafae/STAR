const express = require('express')
const router = express.Router()
const controller = require('../controllers/classController')

//Teacher
router.post('/new-class', controller.createClass)
router.delete('/delete-class', controller.deleteClass)
router.put('/update-class', controller.updateClass)
router.post('/new-section', controller.createSection)
router.delete('/delete-section', controller.deleteSection)
router.put('/update-section', controller.updateSection)
router.post('/add-students', controller.addStudents)
router.delete('/remove-student', controller.removeStudent)
router.get('/roster', controller.getRoster)
router.get('/my-classes', controller.getClasses)
//Students
router.get('/enrolled-classes', controller.getEnrolledClasses)

module.exports = router