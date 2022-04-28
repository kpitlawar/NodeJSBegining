const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log("Request made!!!");
    // set header content type
    res.setHeader('Content-Type', 'text/html');

    // routing
    let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

    // send an html file
    fs.readFile(path, (error, data)=>{
        if(error){
            console.log(error);
            res.end();
        }else{
            res.write(data);
            res.end();
        }

    })
    
   
});

server.listen(3000, 'localhost', ()=>{
console.log("Listening for request on port 3000");
});