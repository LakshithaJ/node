const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{

    // set the response headers
    res.setHeader('Content-Type', 'text/html');

    // send an html response
    fs.readFile('./views/index.html', (err, data) =>{
        if(err){
            console.log('error', err);
            res.end();
        }else{
            // res.write(data); // no need to write data like this if you have a single file, just sent it in the res.end() method
            res.end(data);
        }
    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening');
})