var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('../db/config.js');
var User = require('../db/User.js');

// MIDDLEWARE //
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES //
app.post('/api/login', function(req, res) {
  var userName = req.body.userName;
  var password = req.body.password;

  //TODO: check database and auth
  User.findOne({name: userName}, function(err, user) {
    if (err) {
      res.status(500).json({error: 'Server error'});
    }
    if (!user) {
      res.status(401).json({error: 'User does not exist'});
    } else {
      user.checkPass(password, function(err, isMatch) {
        if (err) {
          res.status(500).json({error: 'Database error'});
        }
        if (!isMatch) {
          res.status(401).json({error: 'Username or password incorrect'});
        } else {
          res.status(200).json({
            userName: user.name,
            calEvents: user.calEvents
          });
        }
      });
    }
  });
});

app.post('/api/cal', function(req, res) {
  var userName = req.body.userName;

  User.findOne({name: userName}, function(err, user) {
    if (err) {
      res.status(500).json({error: 'Server error'});
    } else {
      console.log(user.calEvents);
      res.status(200).json({calEvents: user.calEvents});
    }
  })
});


// test route to see users in db
app.get('/users', function(req, res) {
  User.find(function(err, users) {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(users);
  });
});


module.exports = app;