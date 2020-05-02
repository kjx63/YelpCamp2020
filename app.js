require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const seedDB = require('./seeds');


const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');

const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');


mongoose.connect("mongodb://localhost:27017/YelpCampLocalDB", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Successfully Connected to Local MongoDB');
}).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.locals.moment = require('moment');
// seedDB();


// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "Juke is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Requiring routes
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


// CAMPGROUNDS ROUTES

// COMMENTS ROUTES

// AUTH ROUTES

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('The YelpCamp Server Has Started!');
});