var express = require("express");
var router = express.Router();
const { User } = require("../schemas/user");
const bcrypt = require("bcryptjs");

// const redirectLogin = (req, res, next) => {
//   if (!req.session.user) {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// };
// A route to login and create a session
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

router.post("/register", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  //   check to see if user is an admin
  //   if (req.body.admin === "admin") {
  //     user.isAdmin = true;
  //   }
  // Save student to the database
  user.save().then(
    result => {
      res.send(result);
      console.log(result);
    },
    error => {
      res.status(400).send(error);
    }
  );
});

router.get("/profile/:profileId", (req, res) => {
  User.findById(req.params.profileId)
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/user", (req, res) => {
  const id = req.session.user;
  User.findById(id)
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/users", (req, res) => {
  User.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.patch("/editProfile", (req, res) => {
  const id = req.session.user;
  User.findById(id).then(user => {
    if (!user) {
      return res.status(404).send();
    } else {
      for (let param in req.body) {
        user[param] = req.body[param];
      }
      user.save().then(
        result => {
          //   console.log(user.password);
          res.send(result);
        },
        error => {
          res.status(400).send(error);
        }
      );
    }
  });
});
module.exports = router;
