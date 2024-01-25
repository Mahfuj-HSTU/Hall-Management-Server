const express = require('express');
const router = express.Router();
const hallsController = require('../controller/hallsController');

router.route('/').get(hallsController.getHalls);
router.route('/:id').get(hallsController.getHallDetails);

module.exports = router;
