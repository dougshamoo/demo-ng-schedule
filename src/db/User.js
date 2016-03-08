var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  name: {type: String, required: true},
  pass: {type: String, required: true},
  calEvents: [mongoose.Schema.Types.Mixed]
});

// checkPass compares an input password with stored hash using bcrypt
userSchema.methods.checkPass = function(inputPass, cb) {
  bcrypt.compare(inputPass, this.pass, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  })

  return inputPass === this.pass;
}

userSchema.pre('save', function(next) {
  // bcrypt.hash(this.pass)
  var user = this;
  bcrypt.hash(user.pass, null, null, function(err, hash) {
    if (err) {
      next(err);
    }
    user.pass = hash;
    next();
  });
});

var User = mongoose.model('User', userSchema);

// because demo, reset database every time the server is run
User.remove({}, function(err) { 
   console.log('collection removed');
});

// let's generate some dates based on the current date
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

// because demo, add two users to database
var steve = new User(
  {
    name: 'Steve',
    pass: 'stevepass',
    calEvents:
      [
        {title: "Dave's Birthday", start: new Date(y, m, 1)},
        {title: 'County Fair', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
        {id: 999, title: 'Go jogging', start: new Date(y, m, d - 3, 2, 0), allDay: false},
        {id: 999, title: 'Go jogging', start: new Date(y, m, d + 4, 2, 0), allDay: false},
        {id: 999, title: 'Go jogging', start: new Date(y, m, d + 11, 2, 0), allDay: false},
        {id: 999, title: 'Go jogging', start: new Date(y, m, d + 18, 2, 0), allDay: false},
        {title: 'Buy a standing desk', start: new Date(y, m, d + 1, 5, 0), end: new Date(y, m, d + 1, 6, 30), allDay: false},
        {title: 'Go to Ikea', start: new Date(y, m, d + 7, 5, 0), end: new Date(y, m, d + 7, 6, 30), allDay: false},
        {title: 'Adopt a cat', start: new Date(y, m, d + 13, 5, 0), end: new Date(y, m, d + 13, 6, 30), allDay: false},
        {title: 'Buy cat food', start: new Date(y, m, d + 14, 5, 0), end: new Date(y, m, d + 14, 6, 30), allDay: false},
        {title: 'Take cat to vet', start: new Date(y, m, d + 14, 5, 0), end: new Date(y, m, d + 14, 6, 30), allDay: false},
      ]
  });

steve.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('User Steve created.');
  }
});

var dave = new User(
  {
    name: 'Dave',
    pass: 'davepass',
    calEvents:
      [
        {title: 'My Birthday', start: new Date(y, m, 1)},
        {title: 'Vacation', start: new Date(y, m, d + 4), end: new Date(y, m, d + 7)},
        {id: 888, title: 'Do work', start: new Date(y, m, d - 7, 2, 0), allDay: false},
        {id: 888, title: 'Do work', start: new Date(y, m, d, 2, 0), allDay: false},
        {id: 888, title: 'Do work', start: new Date(y, m, d + 7, 2, 0), allDay: false},
        {id: 888, title: 'Do work', start: new Date(y, m, d + 14, 2, 0), allDay: false},
        {title: 'Read a book', start: new Date(y, m, d, 5, 0), end: new Date(y, m, d, 6, 30), allDay: false},
        {title: 'Buy another book', start: new Date(y, m, d + 6, 5, 0), end: new Date(y, m, d + 6, 6, 30), allDay: false},
        {title: 'Jump on the bed', start: new Date(y, m, d + 11, 5, 0), end: new Date(y, m, d + 11, 6, 30), allDay: false},
        {title: 'Go to Disneyland', start: new Date(y, m, d + 12, 5, 0), end: new Date(y, m, d + 12, 6, 30), allDay: false},
        {title: 'Call Steve', start: new Date(y, m, d + 18, 5, 0), end: new Date(y, m, d + 18, 6, 30), allDay: false},
      ]
  });

dave.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('User Dave created.');
  }
});

module.exports = User;
