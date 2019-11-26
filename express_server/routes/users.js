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
  if (req.body.admin === "admin") {
    user.isAdmin = true;
  }
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

router.get("/profile", (req, res) => {
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

//   const id = req.params.id;
//   User.find()
//     .exec()
//     .then(docs => {
//       //   console.log(docs);
//       res.status(200).json(docs);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
//   console.log(req.session.id);
//   console.log(req.session.email);

const hashPassword = password => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
      return hash;
    });
  });
};
router.patch("/editProfile", (req, res) => {
  const id = req.session.user;
  //   let pass = req.body.password;
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(req.body.password, salt, (err, hash) => {
  //       req.body.password = hash;
  //       console.log(hash);
  //     });
  //   });
  //   let pass = hashPassword(req.body.password);
  User.update(
    { _id: id },
    {
      $set: {
        email: req.body.email,
        // password: pass,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
