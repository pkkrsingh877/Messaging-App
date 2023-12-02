const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const morgan = require('morgan');
const verifyUser = require('./functions/verifyUser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(cookieParser());

//setting up ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);
const postRoutes = require('./routes/post');
app.use('/post', verifyUser, postRoutes); //have to use middleware to verify user

// Setup Mongodb
const databaseSetup = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/messagingApp');
        console.log('DB Connection Successful');
    } catch (error) {
        console.log(error);
        console.log('DB Connection Failed!');
    }
}

databaseSetup();

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT, () => {
    console.log('App is listening at port 8000.');
});

