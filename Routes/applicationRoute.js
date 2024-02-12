const express = require('express');
const router = express.Router();
const applicationController = require('../controller/applicationController');
router
  .route('/')
  .get(applicationController.getApplications)
  .post(applicationController.addApplication)
// router.route('/').get(hallsController.getApplications);
// router.route('/:id').get(hallsController.getHallDetails);
// const getApplications = async (req, res) => {
//     // const query = {};
//     // const cursor = hallCollection.find(query);
//     // const halls = await cursor.toArray();
//     res.send('applications are here');
//   };

//   getApplications;

module.exports = router;