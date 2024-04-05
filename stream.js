const fs = require('fs');

const readStream = fs.createReadStream('./blogs/blog_3.txt', {
    encoding: 'utf8' // ensure the data is UTF and can be read directly, no need of .toString()
});

const writeStream = fs.createWriteStream('./blogs/blog_4');

// readStream.on('data', (chunk) =>{
//     console.log("\n _____________________ NEW CHUNK _____________________ \n");
//     console.log(chunk);
//     writeStream.write("\n _____________________ NEW CHUNK _____________________ \n");
//     writeStream.write(chunk);
// })

// That is a lot of code that goes into reading and writing
// we can do this in a single line using the pipe
readStream.pipe(writeStream);