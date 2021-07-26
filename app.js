//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const saltRounds = 10;


require("./db/conn");
const User = require('./models/users');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req,res) =>{
    res.render("home");
});

app.get("/register", (req,res) =>{
    res.render("register");
});

app.get("/login", (req,res) =>{
    res.render("login");
});


app.post("/register", (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const newUser = new User ({
            email: req.body.email,
            password: hash
        });
    
        newUser.save(function(err){
            if(err){
                console.log(err);
            }else {
                res.render("secrets");
            }
        });
    });
    
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, function(err, foundUser){
        if(err) {
            console.log(err);
        } else{
            if(foundUser) {
                // Load hash from your password DB.
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    // result == true
                    if(result === true){
                        res.render("secrets");
                    }
                });         
            }
        }       
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});