//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
const featuredpostsSchema = new mongoose.Schema({
  video: String,
  title: String,
  content: String,
});

const Featuredpost = mongoose.model("Featuredpost", featuredpostsSchema);

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
      res.render("home", { blogs: blogs });
    }
  });
});

////////GET FEATURED VIDEO PAGE SECTION
app.get("/featuredvideo", function (req, res) {
  Featuredpost.find({}, function (err, videos) {
    if (err) {
      console.log(err);
    } else {
      res.render("featuredvideo", { videos: videos });
    }
  });
});

//////////compose route
app.get("/compose", function (req, res) {
  res.render("compose");
});

//////////VIDEO POST SECTION
app.post("/videoSubmitForm", function (req, res) {
  const post = new Post({
    video: req.body.videoEmbed,
    title: req.body.videoTitle,
    content: req.body.videoContent,
  });
  post.save();
  res.redirect("/video");
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

///////VIDEO DELETE SECTION
app.post("/deleteVid", function (req, res) {
  const deleted = req.body.deleteTitle;

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
  const featuredpost = new Featuredpost({
    video: req.body.featuredVideoEmbed,
    title: req.body.featuredVideoTitle,
    content: req.body.featuredVideoContent,
  });

  featuredpost.save();
  res.redirect("/featuredvideo");
});

//////////FEATURED VIDEO DELETE SECTION
app.post("/deleteFeaturedVid", function (req, res) {
  const deletedFeature = req.body.deleteFeaturedTitle;

  Featuredpost.deleteOne({ title: deletedFeature }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/featuredvideo");
    }
  });
});

//////////BLOG POST SECTION
app.post("/blogsSubmitForm", function (req, res) {
  const blog = new Blog({
    image: req.body.blogImage,
    title: req.body.blogTitle,
    content: req.body.blogContent,
  });
  blog.save();
  res.redirect("/blog");
});

// app.post("/videoSubmitForm", function (req, res) {
//   const post = new Post({
//     video: req.body.videoEmbed,
//     title: req.body.videoTitle,
//     content: req.body.videoContent,
//   });
//   post.save();
//   res.redirect("/video");
// });

///////BLOG DELETE SECTION
app.post("/deleteBlog", function (req, res) {
  const deletedBlog = req.body.deleteBlogTitle;

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
    title: req.body.featuredBlogTitle,
    content: req.body.featuredBlogContent,
  });

  featuredblog.save();

  res.redirect("/");
});

//////////FEATURED BLOG DELETE SECTION
app.post("/deleteFeaturedBlog", function (req, res) {
  const deletedFeaturedBlog = req.body.deleteFeaturedBlogTitle;

  Featuredblog.deleteOne({ title: deletedFeaturedBlog }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
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

///////////GET FEATURED BLOG PAGE SECTION
// app.get("/home", function (req, res) {
//   Featuredblog.find({}, function (err, blogs) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("home", { blogs: blogs });
//     }
//   });
// });

////////GET FEATURED BLOG PAGE SECTION
// app.get("/", function (req, res) {
//   Featuredblog.find({}, function (err, blogs) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("blog", { blogs: blogs });
//     }
//   });
// });

/////////LISTENING TO PORT
const port = 5000;

app.listen(port, function () {
  console.log("Server started on port 5000");
});
