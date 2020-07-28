const HtmlWebpackPlugin = require("html-webpack-plugin");

const options = {
  lang: "en",
  title: "测试页面",
  meta: [
    {
      name: "chartset",
      content: "utf-8",
    },
  ],
};

module.exports = function (entries) {
  const htmlPlugins = [];
  entries.forEach((entry, index) => {
    console.log(entry, `entry ${index}`);
    const { name, inject = true, template = "index" } = entry;
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: name + ".html",
        inject,
        template: template + ".html",
        chunks: ["main_standalone"], //自定义html挂载的(入口chunk)js文件 vendor或者runtime这种独立的chunk会自动被加入html文件中
        //此处只是绝对入口文件的chunks 加入哪些
        ...options,
      })
    );
  });
  return htmlPlugins;
};
