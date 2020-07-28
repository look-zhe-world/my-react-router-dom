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


// ReactDOM.render<Props>(React.createElement("div", null, "111"), document.body);
ReactDOM.render(<Component name="1">
    111
</Component>, document.body);

// console.log(document.body);