const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { redirect } = require('next/dist/server/api-utils');

// connect to the MongoDB server and listen for requests
const dbURI = 'mongodb+srv://test:Jo2ecCOZt2uOh9ce@cluster0.kpz7fs4.mongodb.net/';

// express app
const app = express();

// listen for requests
mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  // .then(result => console.log('hey yaaaa'))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// App routes
app.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      // no need to specify any path, will directly look into the views folder and render the file mentioned
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => console.log(err));

});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create_blog', { title: 'Create a new blog' });
});

app.post('/new-blog', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blog/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
  .then(result => {
    res.render('details', {blog: result, title: 'Blog Details'});
  })
  .catch(err => {
    console.log(err);
  });
});

app.delete('/blog/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});