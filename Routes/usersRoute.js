const express = require('express');
const usersController = require('../controller/usersController');
const router = express.Router();

router.route('/').get(usersController.getUsers).post(usersController.postUsers);

module.exports = router;
