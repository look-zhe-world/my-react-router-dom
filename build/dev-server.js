///此处涉及到express的use中间件使用， 及webpack的compiler 使用，这块不太熟悉，后面来看
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const opn = require("opn");
const path = require("path");
const express = require("express");
const webpack = require("webpack");
const proxyMiddleware = require("http-proxy-middleware");
const webpackConfig = require("./webpack.config");

const port = process.env.PORT || 8089;
const autoOpenBrower = true;
const proxyTable = {};

const app = express();
const compiler = webpack(webpackConfig);
console.log(compiler, "compiler");

const devMiddleWare = require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

const hotMiddleWare = require("webpack-hot-middleware")(compiler, {
  log: () => {},
});

// compiler.plugin("compilation", (compliation) => {
//   compliation.plugin("html-webpack-plugin-after-emit", (data, cb) => {
//     hotMiddleWare.publicPath({
//       action: "reload",
//     });
//     cb && cb();
//   });
// });

// app.use(proxyMiddleware)

app.use(devMiddleWare);
app.use(hotMiddleWare);

const uri = "http://localhost:" + port + '/main.html';

devMiddleWare.waitUntilValid(() => {
  console.log("listening at" + uri);
  opn(uri);
});

app.listen(port);
