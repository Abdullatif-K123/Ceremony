const router = require("express").Router();
const User = require("../model/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register router
router.post("/register", async (req, res) => {
  try {
    const { user_name, email, password, passwordCon, phone } = req.body;
    if (!(email && user_name && password && passwordCon, phone))
      res.status(400).send("All inputs are required!!!");
    if (!validator.isEmail(email))
      res.status(400).send("Please make a valid Email!!!");
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(403).send("User already exist, Please go to login");
    }
    if (password !== passwordCon) {
      res
        .status(400)
        .send("Please check your Password and confirmation Password");
    } else {
      const encryptedpassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        user_name,
        email: email.toLowerCase(),
        password: encryptedpassword,
        phone,
      });
      res.redirect("/ceremony/login");
    }
  } catch (err) {
    console.log(err);
  }
});

// Login Route root
router.post("/login", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    if (!(user_name && password)) {
      res.status(400).send("All inputs required!!!");
    }
    if (!validator.isEmail(user_name)) {
      const existUser = await User.findOne({ user_name: user_name });
      if (existUser && (await bcrypt.compare(password, existUser.password))) {
        const token = jwt.sign(
          { user_id: existUser._id, user_name, IsAdmin: existUser.IsAdmin },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        existUser.token = token;
        res.cookie("auth", token);
        if (existUser.IsAdmin) res.redirect("/ceremony/admin");
        else res.redirect("/ceremony/home");
      } else {
        res.status(400).send("There are problem with UserName or Password");
      }
    } else {
      const existUser = await User.findOne({ email: user_name });

      if (existUser && (await bcrypt.compare(password, existUser.password))) {
        const token = jwt.sign(
          { user_id: existUser._id, user_name, IsAdmin: existUser.IsAdmin },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        existUser.token = token;
        res.cookie("auth", token);
        if (existUser.IsAdmin) res.redirect("/ceremony/admin");
        else res.redirect("/ceremony/home");
      } else {
        res.status(400).send("There are problem with user_name or Password");
      }
    }
  } catch (err) {
    res.status(400).send("Error There are problem with your request");
  }
});

//logout route post API
router.post("/logout", (req, res) => {
  res.clearCookie("auth");
  res.end();
  res.redirect("/ceremony/login");
});
//login route get API
router.get("/login", (req, res) => {
  res.status(200).send("Hello welcome to login Route root!!!");
});
//Register route Get API
router.get("/register", (req, res) => {
  res.status(200).send("Welcome to register route root!!!");
});
module.exports = router;
