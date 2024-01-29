const express = require('express');
const studentsController = require('../controller/studentsController');
const router = express.Router();

router.route('/').get(studentsController.getStudents);
router.route('/:id').get(studentsController.getStudentDetails);

module.exports = router;
