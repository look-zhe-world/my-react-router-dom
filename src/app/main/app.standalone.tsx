import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router , Route } from '../../react-router-dom';

class Home extends React.PureComponent {
    render(){
       return <div>home</div>
    }
}

class Profile extends React.PureComponent {
    render(){
        return <div>
            profile
        </div>
    }
}

class User extends React.PureComponent {
    render(){
        return <div>
            user
        </div>
    }
}

ReactDOM.render(
    <Router >
        <Route path='/home' component={Home}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/user' component={User}/>
    </Router>
    ,document.getElementById('root'))

// import React from 'react';
// import ReactDOM from 'react-dom';
// import getRoot from './getRoot';
// import Router from './Router';

// interface Props {
//     name:string
// }


// // // function Component(props:Props):JSX.Element{
// // //     return <div>
// // //        {props.children}
// // //     </div>
// // // }

// // class Component extends React.PureComponent <Props> {
// //     render(){
// //         return <div>
// //             {this.props.name}
// //         </div>
// //     }
// // }

// const { rootComponent:Root } = getRoot(Router);


// // // ReactDOM.render<Props>(React.createElement("div", null, "111"), document.body);
// // ReactDOM.render(<Component name="1">
// //     111
// // </Component>, document.body);
// ReactDOM.render(<div>
//     111
// </div>,document.getElementById('root'));

// // console.log(document.body);