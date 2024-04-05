const fs = require('fs');

// read files
// fs.readFile reads file asynchronously, ie it doesn't block the code that is below it from executing. Once the file is read, it will fire the callback.
fs.readFile('./blogs/blog_1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    // console.log(data); // this is going to print a buffer ie package of data that is being sent to us when we try to read the file
    console.log(data.toString()); // this is going to print the actual data 
});

// write to files
// fs.writeFile writes to file asynchronously. It replaces the entire file content with new content. Once the file is written to, it will fire the callback.
// if the file mentioned in the first argument is not available, it will create a new file with that name
fs.writeFile('./blogs/blog_1.txt', 'content to be written in the file', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('finished writing to the file');
});

// directories
// throws an error if the directory does exist so always check the existence of the directory
if (!fs.existsSync('./blogs/blog_3.txt')) {
    fs.mkdir('./blogs/blog_3.txt', (err) => {
        if (err) console.log(err);
        console.log('finished creating directory');
    });
} else {
    fs.rmdir('./blogs/blog_3.txt', (err) => {
        if (err) console.log(err);
        console.log('removed the directory');
    });
}


// delete files
// always check for a files existene before deleting it
if (fs.existsSync('./blogs/deleteme.txt')) {
    try {
        fs.unlinkSync('./blogs/deleteme.txt');
        console.log('Deleted the file');
    } catch (err) {
        console.error(err);
    }
}