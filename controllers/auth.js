const User=require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "weareagangoffour";


exports.createuser=async (req, res) => {
    //check whether the user with this email exists already

    let success=false;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      res.json({ success, authToken });
    } catch (error) {
      success=false;
      console.log(error.message);
      res.status(500).json({success, error : "Some error occured"});
    }
}

exports.login=async (req, res) => {

    let success=false;

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      success=false;
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

exports.getuser=async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.json(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }