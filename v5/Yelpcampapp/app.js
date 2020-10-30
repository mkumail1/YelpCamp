var express                 =require("express"),
    app                     =express(),
    bodyParser              =require("body-parser"),
    mongoose                = require('mongoose'),
    flash                   =require("connect-flash"),
    passport                =require("passport"),
    LocalStrategy           =require("passport-local"),
    methodOverride          =require("method-override");
    Campgrounds             =require("./models/campground"),
    Comment                 =require("./models/comment"),
     User                    =require("./models/user"),
     seedDB                  =require("./seeds");

     var commentRoutes=require("./routes/comments");
     var authRoutes=require("./routes/auth");
     var campgroundRoutes=require("./routes/campgrounds");

mongoose.connect( "mongodb+srv://Hussain:Hussain-2000@hussain-lmznc.gcp.mongodb.net/Yelpcampv2?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

//passport configoration
app.use(require("express-session")({
    secret:"I am best football player ever",
    resave:false,
    saveUninitialized:false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This passes the req.user to every route no need to manually write currentUser:re.user in each route
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    
    next();
})




app.get("/",function(req,res){
    res.render("landingpage")
})


app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);


app.listen("8080",function(){

    console.log("The YelpCamp Has Started");
});