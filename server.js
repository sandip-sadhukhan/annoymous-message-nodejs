const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Mongoose connection
mongoose.connect('mongodb://localhost/annoymous-message-dev',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb is connected..."))

// Express middlewars
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

// Ejs middlewars
app.set('view engine', 'ejs');

// Index route
app.get('/', (req, res) => {
    res.render('index');
})

// About route
app.get('/about', (req, res) => {
    res.render('about');
})

// Load routes
const messageRoute = require('./routes/message');
app.use('/message', messageRoute);


const port = 5000;

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
})