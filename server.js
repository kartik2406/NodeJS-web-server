const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =  process.env.PORT || 3000;
      
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now} : ${request.method} : ${request.url}`;
    console.log(log);
    
    fs.appendFile('server.log', log + '\n' , (err) => {
        if(err){
            console.log('Unable to append server log');
        }
    });
    next();
});

/*app.use((request, response, next) => {
   response.render('maintenance.hbs') ;
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
   return new Date().getFullYear(); 
});

hbs.registerHelper('screemIt', (text) =>{
   return text.toUpperCase(); 
});

app.get('/', (request, response) => {
    //response.send('<h1>Hello express!!</h1>');
   /* response.send({
       name: 'Kartik',
        likes: [
            'Photography',
            'Series'
        ]
    });*/
    response.render('home.hbs',{
       pageTitle: 'Home Page',
        welcomeMessage: 'Hey there ..HOw are you??'
    });
});


app.get('/about', (request, response) => {
   response.render('about.hbs', {
       pageTitle: 'About Page',
  
   });
});


app.get('/bad', (request,response) => {
   response.send({
       errorMessage: 'Unable to handle request'
   });
});

app.get('/projects', (request, response) =>{
   response.render('projects.hbs', {
       pageTitle: 'Projects Page',
       message: 'This is the projects page'
   }) 
});
app.listen(port, () => {
    console.log(`server is up on port ${port} ` + new Date().getHours() + `:` + new Date().getMinutes());
});
