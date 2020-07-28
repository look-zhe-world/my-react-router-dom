const path = require("path");
const _ = require("lodash");
//manifest 生成签名文件
const WebpackAssetsManifest = require("webpack-assets-manifest");
//引入静态资源
const CopyWebpackPlugin = require("copy-webpack-plugin");
//css压缩提取
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TsImportPluginFactory = require('ts-import-plugin');

//html文件上挂载公共js文件 react react-dom
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-tags-plugin");
//引入一个基础html文件
const generateHtml = require("./html");

const getExternals = require("./externals");

const htmlPlugin = generateHtml([
  {
    name: "main",
  },
]);

const umdPath = path.join("static", "js", "umd");

const umdCopys = getExternals().map((external) => ({
  from: external.path,
  to: umdPath,
}));

//js文件处理，babel处理  es6,es7=>es5

//react react-dom 进行公共抽离 使用webpack-assets-manifest

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  // mode: "development",
  mode: "development",
  // entry:'./src/index.js',
  entry: {
    main: "./src/app/main/app.js",
    main_standalone: "./src/app/main/app.standalone.tsx",
    // main_standalone: "./src/app/main/app.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"), //输出目录;
    filename: path.posix.join("static", "js/[name].[chunkhash].js"), //name => 指的就是entry的key值
    //输出entry对应的文件 所在位置及文件名
    // library 指的是作为依赖的一些配置
    publicPath: "/", //静态资源挂载前缀，cdn部署使用
    chunkFilename: path.posix.join("static", "js/[id].[chunkhash].js"), //模块分割的js文件所在位置及名字
    // jsonpFunction:'mrlijsonp' //微前端项目里面为了防止冲突，对jsonp进行独立命名，真正的原因需要去研究打包后的代码；
  },
  resolve:{
    extensions: ['.js', '.ts', '.tsx' ],
    // modules: [resolve('src'), resolve('node_modules')], // 依赖的位置
  },
  module: {
    //ts支持 -- 后面补充
    rules: [
      {
        test: /\.tsx?$/,
        // loader: ["babel-loader",'ts-loader'],
        use: [
        // {
        //   loader: "babel-loader",
        //   options: {
        //     configFile: resolve("babel.config.js"),
        //   },
        // },
        {
          loader: "ts-loader",
          options:{
            getCustomTransformers: ()=>({
              before:[
                TsImportPluginFactory({
                  libraryDirectory:'es',
                  libraryName:'antd',
                  style:true,
                })
              ]
            })
          }
        },
      ],
        include: [resolve("src")],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src")],
        options: {
          configFile: resolve("babel.config.js"),
        },
      },
      {
        test: /\.less$/,
        include: [resolve("src")],
        use: []
          .concat([
            // "style-loader",  //作为style标签进行插入
            MiniCssExtractPlugin.loader, //提取成css文件
            {
              loader: "css-loader",
              options: {
                // modules: true,
                // localIdentName: "[local]__[hash:base64:5]",
                // minimize: true,
                sourceMap: true,
                // url: true,
                modules: { // 开启css module 处理
                  mode: "local",
                  exportGlobals: true,
                  localIdentName: "[local]__[hash:base64:5]",
                },
              },
            },
            // "postcss-loader", //对css文件可以做大量处理
          ])
          .concat({
            loader: "less-loader",
            options: {
              //覆盖原本的less变量的值
              modifyVars: {
                hd: "2px",
              },
            },
          }),
      },
      {
        test: /\.less$/,
        include: [resolve("node_modules")],  // node_modules 里面的less文件不能启用 css module
        use: []
          .concat([
            // "style-loader",  //作为style标签进行插入
            MiniCssExtractPlugin.loader, //提取成css文件
            {
              loader: "css-loader",
              // options: {
              // },
            },
            // "postcss-loader", //对css文件可以做大量处理
          ])
          .concat({
            loader: "less-loader",
            options: {
              //覆盖原本的less变量的值
              modifyVars: {
                hd: "2px",
              },
            },
          }),
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 1,
          name: path.posix.join("static", "img/[name].[contenthash:7].[ext]"),
        },
      },
      // {
      //   test: /\.(svg)$/,
      //   use: [
      //     "@svgr/webpack", //把svg作为react组件进行处理
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 0,
      //         name: path.posix.join("static", "svg/[name].[ext]"),
      //       },
      //     },
      //   ],
      //   // include: [resolve("src")],
      //   // loader: ["url-loader?limit=1"],
      // },
      {
        test: /\.(svg)$/,
        use: ["svg-sprite-loader"],
        // include: [resolve("src")],
        // loader: ["url-loader?limit=1"],
      },
    ],
  },
  //排除依赖性打包，通过配置直接进行打包
  // 外链 => import 或者 require 进行转化 
  // import React form 'reacat'  key=>指的就是依赖名
  //value指的是 挂载在window或者global的全局对象的属性
  externals: {
    react: "React", //react 和 react-dom 进行单独打包 抽离
    "react-dom": "ReactDOM",
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        vendor: {
          name: "vendor",
          //自动会融合html中  //本质上babel的runtime 在js文件里面本质上也是进行了import引入，所以此处babel的runtime相关的代码也会被打包进入
          test: (module) => {
            // console.log(module);
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, "../node_modules")
              ) === 0
            );
          },
          chunks: "all",
          enforce: true,
        },
      },
    },
    runtimeChunk: "single", //webpack自带的进行独立chunk分割 并联动html-webpack-plugin 进行挂载js文件runtimeChunk ，作用是将包含chunks映射关系的list单独从app.js里提取出来，因为每一个chunk的id基本都是基于内容hash出来的，所以你每次改动都会影响它，如果不把它提取出来的话，等于app.js每次都会改变，缓存就失效了。
  },
  // devtool: "#source-map",
  devtool:"cheap-module-source-map",
  plugins: [
    new MiniCssExtractPlugin({
      //将处理的css作为文件打包到指定位置
      filename: path.posix.join("static", "css/[name].[contenthash].css"),
    }),
    ...htmlPlugin,
    new HtmlWebpackIncludeAssetsPlugin({
      //将externals依赖文件地址作为script 链接到html中（功能仅限与在html加script并加上src地址，没有其他功能）
      tags: _.map(getExternals(), (external) =>
        path.join("static", "js", "umd", external.fileName)
      ),
      append: false,
      // publicPath:'' 文件前缀地址
    }),
    new CopyWebpackPlugin({
      //将react 和 react-dom 依赖文件进行复制到项目中
      patterns: [...umdCopys],
    }),
    new WebpackAssetsManifest({
      //生成签名文件供外部调用
      output: "main.json",
      entrypoints: true,
      entrypointsKey: false,
      publicPath: true,
      transform(assets) {
        // console.log(assets);
        return assets.main;
      },
    }),
  ],
};
