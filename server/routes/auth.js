const express= require('express')
const router =express.Router()
const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
   
    const newUser = {
        googleId:profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
    }
    try{

        let user =await User.findOne({ googleId: profile.id });

        if (user) {
            done(null,user);

        } else {
            user= await User.create(newUser);
            done(null,user);
        }
    }
    catch(error) {
        console.log(error);
    }
  }
));

//Google Login Route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback', 
  passport.authenticate('google',
   { failureRedirect: '/login-failure',
     successRedirect: 'http://localhost:8080/dashboard'
   }),
  
  );


  //Rout if Something Goes Wrong
  router.get('/login-failure',(req,res)=>{
    res.send("Something went wrong...")
  })
  

//Destroy user session

// Destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if(error) {
        console.log(error);
        res.send('Error loggin out');
      } else {
        res.redirect('/')
      }
    })
  });
  
  // Persist user dta after successful authentication

  passport.serializeUser(function(user,done)
  {
    done(null,user.id);
  })


  //Retreive USer daata after sessions
  passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    })
  })


module.exports =router;