var express = require("express");
var router = express.Router();
const { User } = require("../schemas/user");

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

router.delete("/:userId", (req, res) => {
    User.findByIdAndDelete(req.params.userId)
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
});

module.exports = router;
