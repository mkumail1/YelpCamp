var express=require("express");
var router=express.Router();
var Campgrounds=require("../models/campground");
var middleware=require("../middleware");
//index is by default refered whenever we refer to a folder



router.get("/",function(req,res){
       Campgrounds.find({},function(err,campgrounds){

           if(err)
           {
               console.log(err);
           }
           else
           {
               res.render("campgrounds/campgrounds",{campgrounds:campgrounds,currentUser:req.user});
           }
       });
    });
//Create new Campground
router.post("/",middleware.isLoggedIn,function(req,res){
   var urlExists = require('url-exists');
   var str=req.body.image;
   urlExists(str, function(err, exists) {
   console.log(exists); // true
   if(exists)
   {
    var name=req.body.name;
   var price=req.body.price;
    var image=req.body.image;
    var description=req.body.description;
    var location=req.body.location;
    var author={
        id:req.user._id,
        username:req.user.username,
    }
    Campgrounds.create({
        name:name,
        price:price,
        image:image,
        description:description,
        location:location,
        author:author, 
    },function(err,campground){
        if(err)
        { 
            console.log(err);
        }
        else{
            console.log("This campground added: "+campground);
            res.redirect("/campgrounds")
         }
    
    });
   }
   else{
    res.redirect("/campgrounds/new?error=true");
   }
   });
});
//New campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})
//show page
router.get("/:id",function(req,res){
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err)
        {
            console.log(err)
        }
        else{
            res.render("campgrounds/show",{campground:foundcampground});
        }
    })

});
// Edit Campground Routes

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campgrounds.findById(req.params.id,function(err,campground){
        res.render("campgrounds/edit",{campground:campground});
            
     })

    
})

//Update Campground Route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){

    Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,Updatedcampground){
        if(err){
           res.redirect("/campground") 
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
     })
})

//delete Route

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campgrounds.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds");
        }
    })
})

module.exports=router;