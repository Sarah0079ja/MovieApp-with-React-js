const config = require("config");
const jwt = require("jsonwebtoken");


function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token)
    return res.status(401).json({ msg: "No Token, Authorization Denied" });

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));

    //add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token not valid" });
  }
}

module.exports = auth;
