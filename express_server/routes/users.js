var express = require('express');
var router = express.Router();
const { User } = require('../models/user')

// A route to login and create a session
router.post('/login', (req, res) => {
	User.findByEmailPassword(req.body.email, req.body.password).then((user) => {
		req.session.user = user._id;
		res.status(200);
		res.send("200 OK")
    }).catch((error) => {
		res.status(400)
		res.send("400 User Not Found")
    })
})

// A route to logout a user
router.get('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

router.post('/register', (req, res) => {
    const user = new User({
		email: req.body.email,
		password: req.body.password
    })
	// Save student to the database
	user.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

module.exports = router;
