const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // set the response headers
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html response
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log('error', err);
            res.end();
        } else {
            // res.write(data); // no need to write data like this if you have a single file, just sent it in the res.end() method
            res.end(data);
        }
    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening');
})