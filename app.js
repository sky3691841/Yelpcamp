var port = process.env.PORT || 3000;
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//     {
//         name: "Yangming Mountain",
//         image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/10/04/draft/6899908.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930",
//         description: "Biggest mountain in Taipei City."
//     }, 
//     function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     })

// app.get("/", function(req, res) {
//     res.render("landing");
// })

/** INDEX - Show all the campgrounds */
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allcampgrounds});
        }
    });
});

/** CREATE - add new campground to DB */
app.post("/campgrounds", function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var dsc = req.body.description
    var newCampground = {name:name, image:image, description: dsc}
    
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

/** NEW - Shows the form to create a new campground */ 
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

/** SHOW - shows more info about one campground */
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(port, function() {
    console.log("The Yelpcamp Server has started!");
})