const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const sesion = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

const app = express();



require('./database');
require('./passport/local-auth');

//settings
app.set('port', process.env.PORT||3004);
app.set('views', path.join(__dirname,'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');


//midleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(sesion({
    secret : 'secretsesion',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next)=>{
    app.locals.signupmessage = req.flash('signupmessage');
    app.locals.signinmessage = req.flash('signinmessage');
    app.locals.user = req.user;
    next();
})

//routes
app.use('/', require('./routes/routes'));

//start 
app.listen(app.get('port'),()=>{
    console.log('Server on port: ', app.get('port'));
})