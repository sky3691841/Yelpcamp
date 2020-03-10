var port = process.env.PORT || 3000;
var express = require("express");
var app = express();


app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "North Coast", image: "https://photo.travelking.com.tw/scenery/6BADB9CF-D593-493E-9AAF-556E4B4A73AD_e.jpg"},
        {name: "Yangming Mountain", image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/10/04/draft/6899908.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930"}
    ]

    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(port, function() {
    console.log("The Yelpcamp Server has started!");
})