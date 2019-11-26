const log = console.log;
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const { mongoose } = require("./db/mongoose");
const session = require("express-session");
const cors = require("cors");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Creates a cookie session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600000, // 1 hour
      httpOnly: true
    }
  })
);
// app.use(function(req, res, next) {
//   res.locals.user = req.user;
//   next();
// });
app.use("/api/users", userRouter);

// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
