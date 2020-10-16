const conectarBD = require ('./config/db');
const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routes');
const path = require('path')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

require('dotenv').config({path: 'variables.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extend: true } ));

conectarBD();

app.engine('handlebars',
    exphbs({
        defaultLayout: 'Layout',
        helpers: require('./helpers/handlebars')
    })
);

app.set('view engine', 'handlebars');

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore( { mongooseConnection: mongoose.connection } )
}))

app.use('/', router() );


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('El servidor esta corriendo por el puerto:', port));