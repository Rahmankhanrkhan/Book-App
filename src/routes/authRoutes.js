const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('Profile');
const jwt = require('jsonwebtoken');

const { jwtsecret } = require('../config/jwtsecret');

const signToken = user => {
    return jwt.sign({ userId: user._id }, jwtsecret);
}

const router = express.Router();

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    console.log('email:::', email)

    try {
        const user = new User({ email, password });
        await user.save();
        const userId = user._id
        const token = signToken(user)

        res.send({ token, userId });
        //res.send('Router Requsted!')
        console.log('POSTMAN, req.body:: ', req.body)

    } catch (err) {
        return res.status(404).send(err.message)
    }
});

router.post('/signin', async (req, res) => {
    // console.log('')
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).send({ error: 'enter with email and password ' })
    };
    const user = await User.findOne({ email })
    if (!user) {
        res.status(422).send({ error: 'No data found in db' })
    }
    try {
        const userId = user._id
        console.log('userId', userId);
        await user.comparePassword(password);
        const token = signToken(user)
        res.send({ token, userId })
    } catch (err) {
        res.status(422).send({ message: 'Try again with new password...' })
    }
})


module.exports = router;