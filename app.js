//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const postsSchema = {
  video: String,
  title: String,
  content: String
};

const Post = mongoose.model("Post", postsSchema);


///////////root route

app.get("/", function(req, res){
  res.render("home");
});

//////////compose route
app.get("/compose", function(req, res){
  res.render("compose");
});

/////////video submit route
app.route("/videoSubmitForm")
  .post (function (req, res) {
  const post = new Post ({
    video: req.body.videoEmbed,
    title: req.body.videoTitle,
    content: req.body.videoContent
  })

  post.save();

  res.redirect('/video');

})

  .delete(function(req, res){
  Post.deleteOne({
    title: req.body.deletePost
  }, function(err){
    if(!err){
      res.redirect("/video")
    } else {
      res.send(err);
    }
  });
});


app.get("/video", function(req, res) {
  Post.find({}, function(err, videos){
    res.render("video", {
      videos: videos
    })
  });
});







const port = 5000;

app.listen(port, function() {
  console.log("Server started on port 5000");
});
