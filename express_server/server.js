const log = console.log;
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const { mongoose } = require("./db/mongoose");
const session = require("express-session");
const cors = require('cors');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

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


/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;

app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
