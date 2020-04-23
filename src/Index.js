require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackroutes = require('./routes/trackroutes')
const requireAuth = require('./middleware/requireAuth');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackroutes);

const mongoUri = 'mmongodb+srv://admin:passwordpassword@cluster0-7vuov.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('You\'re connected mongoose!!')
});
mongoose.connection.on('error', err => {
    console.error('Error connection with MONGOOSE...', err)
});



app.get('/', requireAuth, (req, res) => {
    console.log('req.user:::', req.user)
    res.send(req.user.email)
    //res.send('Hi folks!');
});

app.listen(3001, () => {
    console.log('Listening on port 3001!');
});