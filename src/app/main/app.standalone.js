import React from 'react';
import ReactDOM from 'react-dom';
import a from './getRoot.tsx';
// import Component from './1.tsx';

// function Component(props:Props):JSX.Element{
//     return <div>
//        {props.children}
//     </div>
// }

// class Component extends React.PureComponent {
//     render(){
//         return <div>
//             {this.props.name}
//         </div>
//     }
// }

console.log(import('./1.tsx').then(res=>{
    console.log(res,'res') // res 就是返回值
}));





// ReactDOM.render<Props>(React.createElement("div", null, "111"), document.body);
// ReactDOM.render(<Component name="1234">
//     111
// </Component>, document.body);

// console.log(document.body);