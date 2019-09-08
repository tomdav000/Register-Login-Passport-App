const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {auth} = require('../config/auth');
const passport = require('passport');
const router = express.Router();

router.get('/', (req,res)=>{
	res.render('Home');
})

router.get('/register',(req,res)=>{
		res.render('Register');
	
})

router.get('/membership',auth,(req,res)=>{
		res.render('Membership');
	
})

router.post('/',async(req,res)=>{
	try{
		let newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(newUser.password,salt);
		newUser.password = hash;
		await newUser.save();
		res.redirect('/login');
	} catch(err){
		console.error(err);
		res.status(500).send('Not Available...')
	}
})

router.get('/login',(req,res)=>{
		res.render('Login');

})

router.post('/login',(req,res,next)=>{
	passport.authenticate('local',{
		successRedirect: '/membership',
		failureRedirect: '/login'
	})(req,res,next)
})

router.get('/logout',async(req,res)=>{
	req.logout();
	res.redirect('/');
})

module.exports = router;