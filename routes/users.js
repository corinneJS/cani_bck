var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
  const token = uid2(32);
  const hash = bcrypt.hashSync(req.body.password, 10);

	if (!checkBody(req.body, ['username','email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.email }).then(data => {
    if (data === null) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: token,
      });

      newUser.save().then(() => {
        res.json({ result: true, token: token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;cd
  }

  User.findOne({ username: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false });
    }
  });
});


module.exports = router;