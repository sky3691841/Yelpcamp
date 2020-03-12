var express = require("express");
var NodeGeocoder = require("node-geocoder");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
  };
   
var geocoder = NodeGeocoder(options);

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
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var dsc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, price: price, image:image, description: dsc, author: author}
    
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
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

/** Edit Campground Route */
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

/** Update Campground Route */
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

/** Destroy Campground Route */
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            foundCampground.remove();
            req.flash("success", "Campground Deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;