module.exports = function (api) {
  // api.cache.using(() => process.env.NODE_ENV);
  api.cache.using(() => false);  //此配置？ 用处不明
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >= 10", "chrome >= 45"],
        },
        modules: false,
      },
    ],
    "@babel/preset-flow",
    "@babel/preset-react",
  ];
  const plugins = [
    // ['import',{  // 实现 antd 的按需加载
    //   'libraryName':'antd',
    //   'style':true,
    // }],
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 2,
      },
    ],
  ];

  return {
    presets,
    plugins,
    comments: true,
  };
};
