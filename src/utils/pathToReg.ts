// 主要是 pathToRegExp 依赖的使用
const { pathToRegexp } = require('path-to-regexp');

const param: Array<any> = [];

const regexp1 = pathToRegexp('/home/:id/:name', param, { end: false });
// param 只有 在 /home/:id/:name 这种参数型路由的时候起作用
console.log(regexp1, param);

