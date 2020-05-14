var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Campgrounds = require('../models/campground'),
    Comment     = require('../models/comment');

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/login');
}

//comments new
router.get('/new', isLoggedIn, function (req, res) {
    Campgrounds.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err);
  
      } else {
        res.render('comments/new', { campground: campground })
      }
    })
  });
  
  //comments create
  router.post('/', function (req, res) {
  
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

  module.exports = router;