const express = require('express');
const usersController = require('../controller/usersController');
const router = express.Router();

router.route('/').get(usersController.getUsers).post(usersController.postUsers);
router.route('/:email').get(usersController.getUser);
router.route('/:id').delete(usersController.deleteUser);

module.exports = router;
