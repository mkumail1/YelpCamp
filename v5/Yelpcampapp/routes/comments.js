var express=require("express");
var router=express.Router({mergeParams:true});
var Campgrounds=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    console.log(req.params.id);
    Campgrounds.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new",{campground:campground});
        }
    })
});   
router.post("/",middleware.isLoggedIn,function(req,res){
                Campgrounds.findById(req.params.id,function(err,campground){
                    if(err){
                        console.log(err);
                        res.redirect("/campgrounds")
                    }
                    else{

                        Comment.create(req.body.comment,function(err,comment){
                            if(err){
                                req.flash("error","Something went Wrong!!")
                                console.log(err);
                              
                            } 
                            else
                            {
                                comment.author.id=req.user._id;
                                comment.author.username=req.user.username;
                                comment.save();
                               
                                campground.comments.push(comment);
                                campground.save();
                                console.log(comment); 
                                req.flash("success","Successfully added comment!!")
                                res.redirect("/campgrounds/"+campground._id);
                            } 
                        })
                    }

                })
});
//EDit comment route Put
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Campgrounds.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            Comment.findById(req.params.comment_id,function(err,comment){
                if(err)
                {
                   
                    res.redirect("back")
                }
                else
                {
                    res.render("comments/edit",{campground:campground,comment:comment});
                }
            })
        
        }
    })
})

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatecomment){
        if(err){
            console.log(err)
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//Delete Comment Route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err)
        {
            console.log(err)
            res.redirect("back")
        }
        else
        {
            req.flash("success","Comment deleted")
            res.redirect("/campgrounds/"+req.params.id);
        }

    })
})

module.exports=router;