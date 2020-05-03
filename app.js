//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//THIS IS THE SCHEMA FOR THE "REGULAR" VIDEO POST
const postsSchema = new mongoose.Schema({
  video: String,
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postsSchema);

//THIS IS THE SCHEMA FOR THE "FEATURED" VIDEO POST
const featuredvidsSchema = new mongoose.Schema({
  video: String,
  title: String,
  content: String,
});

const Featuredvid = mongoose.model("Featuredvid", featuredvidsSchema);

//THIS IS THE SCHEMA FOR THE "REGULAR" BLOG POST
const blogsSchema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogsSchema);

//THIS IS THE SCHEMA FOR THE "FEATURED" BLOG POST
const featuredblogsSchema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
});

const Featuredblog = mongoose.model("Featuredblog", featuredblogsSchema);

///////////root route
app.get("/", function (req, res) {
  Featuredblog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      Featuredvid.find({}, function (err, videos) {
        if (err) {
          console.log(err);
        } else {
          res.render("home", { videos: videos, blogs: blogs });
        }
      });
    }
  });
});

//////////compose route
app.get("/compose", function (req, res) {
  res.render("compose");
});

////////GET BLOG PAGE
app.get("/blog", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog", { blogs: blogs });
    }
  });
});

//////////BLOG POST SECTION
app.post("/blogsSubmitForm", function (req, res) {
  const blog = new Blog({
    image: req.body.blogImage,
    title: _.startCase(req.body.blogTitle),
    content: req.body.blogContent,
  });
  blog.save();
  res.redirect("/blog");
});

///////BLOG DELETE SECTION
app.post("/deleteBlog", function (req, res) {
  const deletedBlog = _.startCase(req.body.deleteBlogTitle);

  Blog.deleteOne({ title: deletedBlog }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blog");
    }
  });
});

/////////FEATURED BLOG POST SECTION
app.post("/featuredBlogsSubmitForm", function (req, res) {
  const featuredblog = new Featuredblog({
    image: req.body.featuredBlogImage,
    title: _.startCase(req.body.featuredBlogTitle),
    content: req.body.featuredBlogContent,
  });

  featuredblog.save();

  res.redirect("/");
});

//////////FEATURED BLOG DELETE SECTION
app.post("/deleteFeaturedBlog", function (req, res) {
  const deletedFeaturedBlog = _.startCase(req.body.deleteFeaturedBlogTitle);

  Featuredblog.deleteOne({ title: deletedFeaturedBlog }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

////////GET VIDEO PAGE SECTION
app.get("/video", function (req, res) {
  Post.find({}, function (err, videos) {
    if (err) {
      console.log(err);
    } else {
      res.render("video", { videos: videos });
    }
  });
});

//////////VIDEO POST SECTION
app.post("/videoSubmitForm", function (req, res) {
  const post = new Post({
    video: req.body.videoEmbed,
    title: _.startCase(req.body.videoTitle),
    content: req.body.videoContent,
  });
  post.save();
  res.redirect("/video");
});

///////VIDEO DELETE SECTION
app.post("/deleteVid", function (req, res) {
  const deleted = _.startCase(req.body.deleteTitle);

  Post.deleteOne({ title: deleted }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/video");
    }
  });
});

/////////FEATURED VIDEO POST SECTION
app.post("/featuredVideoSubmitForm", function (req, res) {
  const featuredvid = new Featuredvid({
    video: req.body.featuredVideoEmbed,
    title: _.startCase(req.body.featuredVideoTitle),
    content: req.body.featuredVideoContent,
  });

  featuredvid.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

//////////FEATURED VIDEO DELETE SECTION
app.post("/deleteFeaturedVid", function (req, res) {
  const deletedFeature = _.startCase(req.body.deleteFeaturedTitle);

  Featuredvid.deleteOne({ title: deletedFeature }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

/////////LISTENING TO PORT
const port = 5000;

app.listen(port, function () {
  console.log("Server started on port 5000");
});
