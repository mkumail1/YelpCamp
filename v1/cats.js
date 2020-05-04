var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//   name: "George",
//   age: 24,
//   temperament: "Grouchy"
// });
//
// george.save(function(err, cat){
//   if(err){
//     console.log("Something went wrong");
//   }
//   else{
//     console.log("we saved a cat to the db:");
//     console.log(george);
//   }
// });

Cat.create({
    name: "Snow white",
    age: 15,
    temperament: "nice"
}, function(err, cat){
  if(err){
      console.log("Something went wrong");
    }
    else{
      console.log("we saved a cat to the db:");
      console.log(cat);
    }
});

Cat.find({}, function(err, cats){
  if(err){
    console.log("Opps an error occured");
    console.log(error);
  } else{
      console.log("All the cats");
      console.log(cats);
  }
});
