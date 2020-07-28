import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
    name:string
}


// function Component(props:Props):JSX.Element{
//     return <div>
//        {props.children}
//     </div>
// }

class Component extends React.PureComponent <Props> {
    render(){
        return <div>
            {this.props.name}
        </div>
    }
}

console.log(document?.body);


export default Component;