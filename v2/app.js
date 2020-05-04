var express = require('express')
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campgrounds = new mongoose.model('Campground', campgroundSchema);

// Campgrounds.create({
//   name: "Granite creek",
//   image: 'https://live.staticflickr.com/962/27441695367_08716b50a4_b.jpg'
// }, function(err, campground){
//   if(err){
//     console.log("Oopps an error occurred");
//   } else{
//     console.log("Save to database: \n" + campground);
//   }
// });



app.get('/', function(req, res){
  res.render("landing");
});

app.get('/campgrounds', function(req, res){

  //get all campgrounds from db
  Campgrounds.find({}, (err, allcampgrounds) => {
    if (err){
      console.log(err);
    } else{
      res.render("index", {campgrounds: allcampgrounds});
    }
  });

});

app.post('/campgrounds', function(req, res){
  var newCampground = req.body;
  Campgrounds.create(newCampground, (err, campground) => {
    if(err){
      console.log(err);
    }
    else {
      res.redirect('/campgrounds');
    }
  });

});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
  Campgrounds.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else{
      res.render("show", {campground: foundCampground})
    }
  });
});

app.listen('3000', function(){
  console.log("\nServer started successfully");
});
