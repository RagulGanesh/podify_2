const express = require('express')
const router = express.Router();
const userController = require('../controllers/User')
var fetchuser = require('../middleware/fetchuser')

// router.get('/details', User.getDetails)
router.post('/getuser',fetchuser,userController.userDetails)

module.exports = router;
