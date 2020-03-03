var express = require('express');
var router = express.Router();

var passportFacebook = require('../auth/facebook');
var passportGoogle = require('../auth/google');

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Sign In with:' });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook')
);

router.get('/facebook/callback',
  passportFacebook.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
  passportGoogle.authenticate('google', {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

module.exports = router;