const express = require('express');
const path = require('path');

// express app
const app = express();

// set up the port number to listen on
app.listen(3000);

app.get('/', (req, res) => {
    // no need to set the headers or the status code while using express, it inferes the context and sets the values accordingly
    // res.send('<p>Welcome</p>');
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, './views/about.html'));
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// app.get('/*', (req, res) => {
//     // no need to set the headers or the status code while using express, it inferes the context and sets the values accordingly
//     // res.send('<p>Welcome</p>');
//     res.sendFile(path.join(__dirname, './views/404.html'));
// });

// 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './views/404.html'));
});