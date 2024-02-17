const express = require('express');
const router = express.Router();
const administrationController=require('../controller/administrationController')
router.route('/').get(administrationController.getAdministrations).post(administrationController.addAdministration)

module.exports = router;
