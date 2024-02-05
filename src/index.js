const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { format } = require('timeago.js');
const cors = require('cors')

//Initializations
const app = express();
require('./database')

//Settings
app.set('port', process.env.PORT  || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename)=>{
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

app.use(multer({storage:storage}).single('image'));

//Global variables
app.use((req, res, next)=>{
    app.locals.format = format;
    next();
});

//Routes
app.use(require('./routes/index'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server Start 


app.listen(app.get('port'), ()=>{
    console.log(`Server on port: ${app.get('port')}`);
})

