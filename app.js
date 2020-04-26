//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

const videoPosts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/videoSubmitForm", function (req, res) {
  let videoEntry = {
    videoTitle: req.body.videoTitle,
    videoBody: req.body.videoBody,
    videoEmbed: req.body.videoEmbed,
  };

  videoPosts.push(videoEntry);

  res.redirect('/video');

});


app.post("/deleteVid", function (req, res) {

if (req.body.butt == 2) {
  videoPosts.pop();
  res.redirect("/compose")
}

});


app.get("/video", function(req, res) {
  res.render("video", {videoPosts: videoPosts});

});









app.listen(5000, function() {
  console.log("Server started on port 5000");
});
