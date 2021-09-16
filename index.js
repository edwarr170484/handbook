const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const config = require('./config/config'); 
const sequelize = require('./db/connect');
const router = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

app.use('/', router);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(config.development.serverPort, () => {
            console.log(`Server started at address http://localhost:${config.development.serverPort}`);
        });
    }catch(e){
        console.log(e);
    }
}

start();
