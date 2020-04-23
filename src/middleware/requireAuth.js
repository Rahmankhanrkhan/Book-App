const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Profile');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer okjhgvfggaksdjhdchdlj'

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  console.log('token:::',token)

  jwt.verify(token, 'MY_SECRETE_KEY', async (err, payload) => {
    console.log('payload:::', payload);
    if (err) {
      return res.status(401).send({ error: 'Please Log in' });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
