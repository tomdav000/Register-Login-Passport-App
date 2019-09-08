const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db').MongoDB;
const session = require('express-session');
const passport = require('passport');
const app = express();

require('./config/passport')(passport)

mongoose.connect(db,{useNewUrlParser: true, useFindAndModify: false})
	.then(console.log('DB connected...'))
	.catch(err=>console.log('DB not connected...',err));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
	secret: '123abc',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`only on port ${PORT}`));