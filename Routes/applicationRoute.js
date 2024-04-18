const express = require('express');
const router = express.Router();
const applicationController = require('../controller/applicationController');
router
  .route('/')
  .get(applicationController.getApplications)
  .post(applicationController.addApplication);
router
  .route('/:id')
  .get(applicationController.getUserApplication)
  .put(applicationController.updateApplication)
  .delete(applicationController.deleteApplication);

module.exports = router;
