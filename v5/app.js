var express = require('express')
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Campgrounds = require('./models/campground');
var seedDB = require("./seeds");
var Comment = require('./models/comment');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

//passporrt configuration

app.use(require('express-session')({
  secret: "Once again rusty wins cutest dogs!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/yelp_camp_v3', { useNewUrlParser: true, useUnifiedTopology: true });

//seedDB();

app.get('/', function (req, res) {
  res.render("landing");
});

app.get('/campgrounds', function (req, res) {

  //get all campgrounds from db
  Campgrounds.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allcampgrounds });
    }
  });

});

app.post('/campgrounds', function (req, res) {
  var newCampground = req.body;
  Campgrounds.create(newCampground, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/campgrounds');
    }
  });

});

app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function (req, res) {

  Campgrounds.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

app.get('/campgrounds/:id/comments/new', function (req, res) {
  Campgrounds.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);

    } else {
      res.render('comments/new', { campground: campground })
    }
  })
});

app.post('/campgrounds/:id/comments', function (req, res) {

  Campgrounds.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {

      Comment.create(req.body, function (err, comment) {
        if (err) {
          console.log(err);

        } else {
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          console.log(campground);
          res.redirect('/campgrounds/' + campground._id);

        }
      });
    }
  });
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('campgrounds');
    })
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/campgrounds');
});

app.listen('3000', function() {
  console.log("\nServer started successfully");
});


