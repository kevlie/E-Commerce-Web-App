var express = require("express");
var router = express.Router();
const { User } = require("../schemas/user");

router.post("/login", (req, res) => {
  User.findByEmailPassword(req.body.email, req.body.password)
    .then(user => {
      req.session.user = user._id;
      res.status(200).end();
    })
    .catch(error => {
      res.status(400).end();
    });
});

// A route to logout a user
router.get("/logout", (req, res) => {
  // Remove the session
  req.session.destroy(error => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).end();
    }
  });
});

router.get("/isLoggedIn", (req, res) => {
  if (req.session.user) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

router.post("/register", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  user.save().then(
    result => {
      res.status(200).send(result);
    },
    error => {
      res.status(400).send(error);
    }
  );
});

module.exports = router;

