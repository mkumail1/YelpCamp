var express = require('express')
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

var campgrounds = [
  {name: "Salmon Creek", image: "https://live.staticflickr.com/893/27462023027_b11df49f0d_b.jpg"},
  {name: "Granite Hill", image: "https://live.staticflickr.com/3543/3297277787_67de0b1db9_b.jpg"},
  {name: "Mountain Goat's Rest", image: "https://www.richardhorstphotography.com/img/s/v-10/p912732889-3.jpg"}
]

app.get('/', function(req, res){
  res.render("landing");
});

app.get('/campgrounds', function(req, res){
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
  var form = req.body;

  campgrounds.push(form);
  res.redirect('/campgrounds')
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.listen('3000', function(){
  console.log("server started successfully");
});
