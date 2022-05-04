const express = require('express');

// express app
const app = express();

app.listen(3000);

app.get('/', (req, res)=>{
    // res.send('<p> Home page</p>') // sends header automatically along with statusCode
    res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/about', (req, res)=>{
    // res.send('<p> About page</p>') // sends header automatically along with statusCode
    res.sendFile('./views/about.html', {root: __dirname});
});

//redirect

app.get('/about-me',(req, res)=>{
    res.redirect('/about')
});

// 404 page
// use is used to create middleware and fire middleware function in express
// use will fire for every single request
// position of use function should be at the end for route

app.use((req, res)=>{
    res.sendFile('./views/404.html', {root: __dirname})

})