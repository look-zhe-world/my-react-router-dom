const _ = require("lodash");
const path = require("path");

const externals = [
//   {
//     name: "polyfill",
//     dirname: path.resolve(__dirname, "..", "/node_modules/@babel/polyfill/dist"),
//     needEnv: false,
//   },
  {
    name: "react",
    dirname: "node_modules/react/umd",
    needEnv: true,
  },
  {
    name: "react-dom",
    dirname: "node_modules/react-dom/umd",
    needEnv: true,
  },
];

function getExternals(packages = externals) {
  return _.map(packages, (pkg) => {
    if (_.isEmpty(pkg)) {
      return null;
    }
    const { name, dirname, needEnv } = pkg;
    const fileName = needEnv ? `${name}.production.min.js` : `${name}.min.js`;
    return {
      name,
      fileName,
      path: path.join(dirname, fileName),
    };
  });
}

module.exports = getExternals;
