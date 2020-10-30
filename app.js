var express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require('mongoose'),
  Campgrounds = require('./models/campground'),
  seedDB = require("./seeds"),
  Comment = require('./models/comment'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  User = require('./models/user'),
  port = process.env.PORT || 8080;

var indexRoute = require('./routes/index'),
  campgroundsRoute = require('./routes/campgrounds'),
  commentRoute = require('./routes/comments');

mongoose.connect('mongodb://localhost/yelp_camp_v3', { useNewUrlParser: true, useUnifiedTopology: true });

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
passport.use(new LocalStrategy(User.authenticate())); //for local check of authentication
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//for rendering some current data to all local res requests
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/campgrounds", campgroundsRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use("/", indexRoute);

//seedDB();

app.listen(port, function () {
  console.log("\nServer started successfully: port '" + port + "'");
});


