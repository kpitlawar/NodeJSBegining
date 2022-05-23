const express = require('express');
const morgan = require('morgan')

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

app.listen(3000);

// static file middleware
app.use(express.static('public'))

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
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title:'Home', blogs})
});

app.get('/about', (req, res)=>{
    // res.send('<p> About page</p>') // sends header automatically along with statusCode
    res.render('about',  {title:'About'})
});

app.get('/blogs/create', (req, res)=>{
    res.render('create', {title:'Create a new blog'});
})

// 404 page
// use is used to create middleware and fire middleware function in express
// use will fire for every single request
// position of use function should be at the end for route
// example of middleware

app.use((req, res)=>{
    res.status(404).render('404', {title:'404'});

})