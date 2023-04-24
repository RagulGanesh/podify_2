const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const auth=require('../controllers/auth')

const JWT_SECRET = "weareagangoffour";

//Route 1 : Create a User using : POST "/api/auth/createuser". Doesn't require Auth , No login required
router.post(
  "/createuser",
  auth.createuser
);

//Route 2 : Authenticate a User using : POST "/api/auth/login". Doesn't require Auth ,  login required
router.post(
  "/login",
  auth.login
);

//Route 3 : Get logged in user details using : POST "/api/auth/getuser". Doesn't require Auth , No login required
router.post(
  "/getuser", fetchuser,
  auth.getuser
);
module.exports = router;
