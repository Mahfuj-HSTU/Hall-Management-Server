const express = require('express');
const router = express.Router();
const noticeController = require('../controller/noticeController');

router
  .route('/')
  .get(noticeController.getNotice)
  .post(noticeController.addNotice);
module.exports = router;
