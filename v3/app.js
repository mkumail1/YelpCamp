var express = require('express')
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Campgrounds = require('./models/campground');
var seedDB = require("./seeds");


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/yelp_camp_v3', {useNewUrlParser: true, useUnifiedTopology: true});

seedDB();


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
  Campgrounds.findById(req.params.id).populate('comments').exec(function(err, f){
    if(err){
        console.log(err);
    }
    else
    {   
      console.log("clicked " + f);
      res.render('show', {campground: f});
    }
  });
});

app.get('campgrounds/:id/comments/new', function(req, res){

});

app.listen('3000', function(){
  console.log("\nServer started successfully");
});
