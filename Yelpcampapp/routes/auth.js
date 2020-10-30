var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/register",function(req,res){
    res.render("register")
})
//Signup logic
router.post("/register",function(req,res){

    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Yelpcamp "+user.username);
            res.redirect("/campgrounds");
        });
    });
})

router.get("/login",function(req,res){
    res.render("login",{message:req.flash("error")})
})
//Login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
    
});
//Logout logic
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!!")
    res.redirect("/campgrounds");
 
})



module.exports=router;