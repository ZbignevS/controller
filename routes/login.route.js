const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

  // is body ok
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // does it exist
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('No such user');

  // generate jwt
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    email: user.email
  });
});

module.exports = router;
