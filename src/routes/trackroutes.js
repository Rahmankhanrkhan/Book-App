const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });
    res.send({ tracks });
})

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;
    console.log('locations:::', locations)

    if (!name || !locations) {
        return res.status(422).send({ error: 'Provide name&locations' })
    }

    try {
        const track = new Track({ name, locations, userId: req.user._id });
        console.log('track:::',track)
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message })
    }
})

module.exports = router