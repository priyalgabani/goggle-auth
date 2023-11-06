const express = require('express')
const app = express()
const session = require("express-session")
const passport = require("passport")
app.use(session({ secret: "key" }))

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "266396063077-o951asoa1oq2b52jtfpdeainea4v42p5.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8090/auth/google/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        return cb(null, profile)
    }
));

passport.serializeUser((user, done) => {
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    return done(null, user);
});

app.get("/", (req, res) => {
    res.send("home page is available at open")
})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });


app.listen(8090, () => {
    console.log("listening on port 8090");
})