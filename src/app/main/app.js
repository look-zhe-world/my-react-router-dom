// import "./app.less";
// console.log(111, "222");
// import("../../index.js");  // 懒加载了
// console.log(Map);
import t1 from './t1';
console.log('app---- 加载t1', t1);

setTimeout(()=>{
    console.log(import('./t2'),'开始加载t2');
},3000);
