require("dotenv").config();
require("./config/database").connect();
const auth = require("./middleware/verify")
const authRouter = require('./router/auth');
const userRouter = require('./router/users');
const adminRouter = require('./router/admin');
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
//Route App Register
app.use(express.json({ limit: "50mb" }));
app.use('/ceremony', adminRouter);
app.use('/ceremony', authRouter); 
app.use('/ceremony', userRouter);

 
module.exports = app;
