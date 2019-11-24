const log = console.log;
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const { mongoose } = require("./db/mongoose");
const session = require("express-session");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creates a cookie session
app.use(
  session({
    secret: "utama",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600000, // 1 hour
      httpOnly: true
    }
  })
);

app.use("/api/users", userRouter);

// middleware to check for an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/"); // redirect to homepage if logged in.
  } else {
    next(); // next() moves on to the route.
  }
};

app.listen(3001, () => {
  log(`Listening on port ${port}...`);
});
