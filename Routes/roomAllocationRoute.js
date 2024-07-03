const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');
router
  .route('/')
  .get(roomController.getRooms)
  .put(roomController.addStudent)
  .delete(roomController.removeStudent)
  .post(roomController.addRoom);

module.exports = router;
