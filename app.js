var port = process.env.PORT || 3000;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "North Coast", image: "https://photo.travelking.com.tw/scenery/6BADB9CF-D593-493E-9AAF-556E4B4A73AD_e.jpg"},
    {name: "Yangming Mountain", image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/10/04/draft/6899908.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930"}
]

app.get("/", function(req, res) {
    res.render("landing");
})

/** Show all the campgrounds */
app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

/** Logic when submit button is hit */
app.post("/campgrounds", function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name:name, image:image}
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
})

/** Shows the form to create a new campground */ 
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

app.listen(port, function() {
    console.log("The Yelpcamp Server has started!");
})