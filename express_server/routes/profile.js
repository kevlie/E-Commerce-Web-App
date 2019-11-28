var express = require("express");
var router = express.Router();
const { User } = require("../schemas/user");

// const redirectLogin = (req, res, next) => {
//   if (!req.session.user) {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// };
// A route to login and create a session

// router.get("/profile/:profileId", (req, res) => {
//   User.findById(req.params.profileId)
//     .exec()
//     .then(docs => {
//       res.status(200).json(docs);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

router.get("", (req, res) => {
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

router.patch("/edit", (req, res) => {
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
