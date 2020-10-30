var express     = require('express'),
    router      = express.Router(),
    Campgrounds = require("../models/campground");

router.get('/', function (req, res) {

    //get all campgrounds from db
    Campgrounds.find({}, (err, allcampgrounds) => {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/index", { campgrounds: allcampgrounds });
      }
    });
  
  });
  
  router.post('/', function (req, res) {
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
  
  router.get("/new", function (req, res) {
    res.render("campgrounds/new");
  });
  
  router.get("/:id", function (req, res) {
  
    Campgrounds.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      }
      else {
        res.render('campgrounds/show', { campground: foundCampground });
      }
    });
  });

  module.exports = router;