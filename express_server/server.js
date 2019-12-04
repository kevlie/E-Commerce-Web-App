const log = console.log;
const express = require("express");
const app = express();
const profileRouter = require("./routes/profile");
const orderRouter = require("./routes/orders");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const inventoryRouter = require("./routes/inventory");
const { mongoose } = require("./db/mongoose");
const session = require("express-session");
const cors = require("cors");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if(process.env.REMOTE) {
    app.use(cors({credentials: true, origin: "https://csc309-team19-app.herokuapp.com"}));
    console.log("Remote Deploy")
} else {
    app.use(cors({credentials: true, origin: "http://localhost:3000"}));
    console.log("Local Deploy")
}

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

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/inventory", inventoryRouter);

// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
