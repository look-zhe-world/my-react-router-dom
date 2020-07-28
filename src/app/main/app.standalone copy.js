import React ,{useState,useCallback} from "react";
import ReactDOM from "react-dom";
// import _ from "lodash";
import styles from "./app.less";
// import "./app.less";
// import Svg from "../../assets/svg/test.svg";
const svgModule = require("../../assets/svg/test.svg"); //本质上此处 直接import拿到的是webpack_require().default
//ReactComponent 拿到的就是webpack_require().ReactComponent

// console.log(Promise, React, ReactDOM, _);
// console.log(React);

// class MyComponent extends React.PureComponent {
//   render() {
//     console.log(svgModule, "svgModule");
//     const a = 1;
//     // console.log(Svg, a);
//     return (
//       <div>
//         <div className={styles.container}>111111</div>
//         <div>222</div>
//         <div>
//           {/* <Svg /> */}
//         </div>
//       </div>
//     );
//   }
// }
let lasthanderclik;
function MyComponent(props){

  const [number,setNumber] = useState(0);
  const handerClick = useCallback(()=>{
    setNumber(number=>number+1);
  },[]);

  console.log('render',handerClick===lasthanderclik);
  lasthanderclik=handerClick;
  return <div>
    <div>parentNumber:{props.number}</div>
    <div>number:{number}</div>
        <div 
        style={{
          width:50,
          height:50,
          background:'red',
          }} 
          onClick={handerClick}>
            1111
        </div>
  </div>
}


function Test(){
  const [number,setNumber] = useState(1000);
  const handerClick = ()=>{
    setNumber(number=>number+1);
  }
  return <div>
    <div 
        style={{
          width:50,
          height:200,
          background:'blue',
          }} 
          onClick={handerClick}>
            parent number change
        </div>
    <MyComponent number={number}/>
  </div>
}


ReactDOM.render(<Test />, document.body);

// console.log(Promise);
