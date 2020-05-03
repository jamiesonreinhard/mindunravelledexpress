const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//FEATURED VIDEO
const featuredvidsSchema = new mongoose.Schema({
  video: String,
  title: String,
  content: String,
});

//FEATURED BLOG
const featuredblogsSchema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
});

// We then need to create models to use it
module.exports = mongoose.model("Featuredvid", featuredvidsSchema);
module.exports = mongoose.model("Featuredblog", featuredblogsSchema);
