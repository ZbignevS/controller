// const auth = require('../middleware/auth'); veliau?
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();

const app = express();

// sitas veliau?
// router.get('/current', auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   res.send(user);
// });

router.post('/', async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send('User already exists');

  user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.password = await hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    email: user.email
  });
});

module.exports = router;
