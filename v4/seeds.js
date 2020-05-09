var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [{
    name: "Cloud's Rest",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/QdsK3qmSXZje7ByxwJ_8ZA/348s.jpg",
    description: "blah blah blah"
},
{
    name: "Desert's Messa",
    image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1050&q=80",
    description: "blah blah blah"
},
{
    name: "Cloud's Rest",
    image: "https://4.bp.blogspot.com/-KWDrAZVRY6w/VOV9lW239YI/AAAAAAAAJfc/Pf8Rf_bkzGg/s1600/carnaval_02.jpg",
    description: "blah blah blah"
},
]

function seedDB() {

    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);

        } else {
            console.log("Removed Campgrounds!");
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);

                    } else {
                        console.log("Added a campground");
                        Comment.create({
                            text: "This place is great, But I had planned a picnic",
                            author: "Robert di wiede!"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);

                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("added a new comment");

                            }

                        });
                    }

                });

            });
        }
    });


}

module.exports = seedDB;

