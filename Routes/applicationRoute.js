const express = require('express');
const router = express.Router();
const applicationController = require('../controller/applicationController');
router
  .route('/')
  .get(applicationController.getApplications)
  .post(applicationController.addApplication)
  .put(applicationController.updateApplication);

module.exports = router;
