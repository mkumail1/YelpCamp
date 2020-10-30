var middlewareObj={};
var Campgrounds=require("../models/campground")
var Comment=require("../models/comment")
middlewareObj.isLoggedIn =function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be Logged In First !!");
    res.redirect("/login");
}

middlewareObj.checkCommentOwnership=function (req,res,next){
    if(req.isAuthenticated())
    {
        
        Comment.findById(req.params.comment_id,function(err,comment){
            if (err)
            {
                res.redirect("back")
            } 
            else
            {
              
                if(comment.author.id.equals(req.user._id))
                {
                    next()
                    // res.render("campgrounds/edit",{campground:campground});
                }
                else
                {
                    req.flash("error","Permission Denied!!!")
                    res.redirect("back");
                }
            }
         })
    }
    else
    {
        req.flash("error","You need to be logged In to do that!!");
        res.redirect("back");
    }
   
}
middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated())
    {
        
        Campgrounds.findById(req.params.id,function(err,campground){
            if (err)
            {
                req.flash("error","campground not found!!!")
                res.redirect("back")
            } 
            else
            {
                console.log(campground.author.id);
                console.log(req.user._id);
                if(campground.author.id.equals(req.user._id))
                {
                    next()
                    // res.render("campgrounds/edit",{campground:campground});
                }
                else
                {
                    req.flash("error","Permission Denied!!!")
                    res.redirect("back");
                }
            }
         })
    }
    else
    {
        req.flash("error","You need to be logged In to do that!!")
        res.redirect("back");
    }
   
}
module.exports=middlewareObj;