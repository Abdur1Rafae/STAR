const express = require('express')
const router = express.Router()
const controller = require('../controllers/classManagementController')

router.post('/new-class', controller.createClass)
router.delete('/delete-class/:classId', controller.deleteClass)
router.put('/update-class/:classId', controller.updateClass)

router.post('/new-section/:classId', controller.createSection)
router.delete('/delete-section/:sectionId', controller.deleteSection)
router.put('/update-section/:sectionId', controller.updateSection)

router.post('/add-students/:sectionId', controller.addStudentsToSection)
router.delete('/remove-student/:sectionId/:studentId', controller.removeStudentFromSection)

router.get('/roster/:sectionId', controller.getRoster)
router.get('/my-classes', controller.getClasses)

module.exports = router