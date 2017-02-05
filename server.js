const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//express middelware
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
var now= new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append file log');
    }
  });
  next();
});

app.use
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('sreamIt', (text)=>{
  return text.toUpperCase();
});

hbs.registerHelper('logo', ()=>{
  return "./images/headerLogo.png";
});

app.get('/', (req, res)=>{
  // res.send('<h1>Hello Express!!</h1>');
  res.render('home.hbs',{
    pageTitle:'Alba Enterprise',
    adress:'Via Guadagnini 32',
    welcomeMessage: 'Welcome in the new dimension of health care',
  });
});

app.get('/about',(req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res)=>{
  res.render('projects.hbs', {
    pageTitle: 'Projects page',
  });
});

app.get('/modules',(req, res)=>{
  res.render('modules.hbs',{
    pageTitle: 'Modules Page',
  });
});

app.get('/contacts',(req, res)=>{
  res.render('contacts.hbs',{
    pageTitle: 'Contacts Page',
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'This is an errorMessage',
  });
});

app.listen(3000, ()=>{
 console.log('Server listen on port 3000');
});
