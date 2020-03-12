var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

/** INDEX - Show all the campgrounds */
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});

/** CREATE - add new campground to DB */
router.post("/", function(req, res) {
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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
})

/** SHOW - shows more info about one campground */
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;