const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.connection.on('error', error => console.log(error));

const conectarBD = async () => {

    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Acceso correcto a BD');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener la app
    }
}

module.exports = conectarBD;