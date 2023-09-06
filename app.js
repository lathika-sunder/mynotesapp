require('dotenv').config();
const express= require('express');
const expressLayout=require('express-ejs-layouts');
const connectDB =require('./server/config/db');
const session = require('express-session')
const passport=require('passport')
const MongoStore= require('connect-mongo');


const app =express();
const port= 8080 || process.env.PORT;


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Connect to Database
connectDB();

//Static Files
app.use(express.static(__dirname+'/public'));

//Templating engine
app.use(expressLayout);
app.set('layout',"./layouts/main");
app.set('view engine', 'ejs');
//const viewspath= path.join("C:\Users\lathi\OneDrive\Desktop\mynotesapp\.vs\views")
//console.log(viewspath)
//app.set("views",viewspath)


//Routes
app.use('/',require('./server/routes/auth'));
app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/dashboard'));

//Handle 404
// Handle 404
app.get('*', function(req, res) {
    //res.status(404).send('404 Page Not Found.')
    res.status(404).render('404');
  })

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`);
})