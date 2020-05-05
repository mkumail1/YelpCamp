var mongoose   = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/campground');

var data = [{
        name: "Cloud's Rest",
        image: "https://picsum.photos/536/354",
        desccription: "blah blah blah"
    },
    {
        name: "Desert's Messa",
        image: "https://teakdoor.com/images/imported/2020/04/703.jpg",
        desccription: "blah blah blah"
    },
    {
        name: "Cloud's Rest",
        image: "https://picsum.photos/seed/picsum/536/354",
        desccription: "blah blah blah"
    },
]

function seedDB(){

    Campground.remove({}, function(err){
        if(err){
            console.log(err);
            
        } else{
            console.log("Removed Campgrounds!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err);
                        
                    } else{
                        console.log("Added a campground with details: \n" + data);
                        Comment.create({
                            text: "This place is greate, But I with I had planned a picnic",
                            author: "Robert di wiede!"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                                
                            } else {
                                console.log(comment);
                                
                            }
                        })

                    }
                    
                });
            });
        }
    });

    
}

module.exports = seedDB;

