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
(req, res, next) => {
  const { redirectURL } = req.query;
  const state = redirectURL
    ? Buffer.from(JSON.stringify({ redirectURL })).toString('base64') : undefined
  const authenticator = passportFacebook.authenticate('facebook',  { state })
  authenticator(req, res, next)
  }
);

router.get('/facebook/callback',
  passportFacebook.authenticate("facebook", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    const { state } = req.query
    const { redirectURL } = JSON.parse(Buffer.from(state, 'base64').toString())
    return res.redirect(redirectURL)
  }
);

/* GOOGLE ROUTER */
router.get('/google',
  (req, res, next) => {
    const { redirectURL } = req.query;
    const state = redirectURL
      ? Buffer.from(JSON.stringify({ redirectURL })).toString('base64') : undefined
    const authenticator = passportGoogle.authenticate('google', { scope: ['profile'], state })
    authenticator(req, res, next)
  }
);

router.get('/google/callback',
  passportGoogle.authenticate('google', {
    failureRedirect: "/login"
  }),
  (req, res) => {
    const { state } = req.query
    const { redirectURL } = JSON.parse(Buffer.from(state, 'base64').toString())
    return res.redirect(redirectURL)
  }
);

module.exports = router;