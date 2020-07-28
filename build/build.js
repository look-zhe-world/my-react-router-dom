const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
webpack(webpackConfig, function (err, stats) {
  if (err) {
    console.log(err);
  }
  console.log(stats);
});
