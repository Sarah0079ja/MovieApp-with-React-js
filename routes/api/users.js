const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User model
const User = require("../../models/User");


//GET
router.get('/', (req, res)  => {
 User.find()
  .sort({date: -1})
  .then(users => res.json(users)) 
  
})
  


//@route POST /users
//@desc  Register new user
//@access public

router.post("/", (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  //validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ msg: "" });
  }

  // //check existing user

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exist" });

    const newUser = new User({
      first_name,
      last_name,
      email,
      password
    });

    //create salt and harsh pasword
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  password: user.password
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
