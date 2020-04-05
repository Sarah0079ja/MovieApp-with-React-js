const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User model
const User = require("../../models/User");

//@route POST api/auth
//@desc  Auth User
//@access private

router.post("/", (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  //check existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not  exist" });

    //validating password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credientials" });

      jwt.sign(
        { id: user.id },
        config.get("JWT_SECRET"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              first_name: user.first_name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

//@route GET api/auth/user
//@desc  GET user data
//@access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
