const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const { send, render } = require('express/lib/response');

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
 

// Logger middleware
// app.use((req, res, next)=>{
//     console.log('new request made:');
//     console.log('host:',req.hostname);
//     console.log('path:',req.path);
//     console.log('method:',req.method);
//     next();

// })

app.get('/', (req, res)=>{
    // res.send('<p> Home page</p>') // sends header automatically along with statusCode
    res.redirect('/blogs')
});

app.get('/about', (req, res)=>{
    // res.send('<p> About page</p>') // sends header automatically along with statusCode
    res.render('about',  {title:'About'})
});

// blog route
app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs', blogs:result})
    })
    .catch((error)=>{
        console.log(error)
    })
}); 

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);  
    blog.save()
    .then((result)=>{
        res.redirect('./blogs')
    }).catch((error)=>{
        console.log(error);
    })
    console.log(req.body);
})

app.get('/blogs/create', (req, res)=>{
    res.render('create', {title:'Create a new blog'});
})
app.get('/blogs/:id', (req, res) => {
  console.log(req.params);
    const id = req.params.id;
    Blog.findById({_id:id})
      .then(result => {
        res.render('./details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });


// 404 page
// use is used to create middleware and fire middleware function in express
// use will fire for every single request
// position of use function should be at the end for route
// example of middleware

app.use((req, res)=>{
    res.status(404).render('404', {title:'404'});

})