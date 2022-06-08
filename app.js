const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
 const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://kanchanpitlawar:test123@cluster0.apopn.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result)=> app.listen(3000))
.catch((error)=> console.log(error))


// register view engine
app.set('view engine', 'ejs');

// static file middleware
app.use(express.static('public')); 
app.use(express.urlencoded({extended:true})); // used to fet form data into oject form
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    // res.send('<p> Home page</p>') // sends header automatically along with statusCode
    res.redirect('/blogs')
});

app.get('/about', (req, res)=>{
    // res.send('<p> About page</p>') // sends header automatically along with statusCode
    res.render('about',  {title:'About'})
});

// blog route
app.use(blogRoutes);

// 404 page
// use is used to create middleware and fire middleware function in express
// use will fire for every single request
// position of use function should be at the end for route
// example of middleware

app.use((req, res)=>{
    res.status(404).render('404', {title:'404'});

})