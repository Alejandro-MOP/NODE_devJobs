const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routes');
const app = express();

app.engine('handlebars',
    exphbs({
        defaultLayout: 'Layout'
    })
);

app.set('view engine', 'handlebars');

app.use('/', router() );

app.listen(4000);