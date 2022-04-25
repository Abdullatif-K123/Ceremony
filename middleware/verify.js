const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token || req.cookies.auth;
  if (!token) {
    return res.status(403).send("You are not Authenticated!!!!");
  }
  try {
    const decode = jwt.verify(token, config.TOKEN_KEY);
    req.user = decode;
  } catch (err) {
    return res.status(401).send("Invalid token maybe it is ExpIred or not !!");
  }
  return next();
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.IsAdmin) {
        next();
    } else {
      res.status(403).send("You are not allowed to do that!!!");
    }
  });
};
module.exports = 
{verifyToken, verifyTokenAndAdmin};
