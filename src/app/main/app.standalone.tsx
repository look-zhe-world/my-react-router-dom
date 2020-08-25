import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
// import {  HashRouter as Router , Route, Link, Switch, RouteComponentProps } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import { HashRouter as Router , Route, Link, Switch, RouteComponentProps, MenuLink, Redirect, Location } from '../../react-router-dom';
import { BrowerRouter as Router , Route, Link, Switch, RouteComponentProps, MenuLink, Redirect, Location } from '../../react-router-dom';
import Protected from './Protected';

type HomeProps = React.PropsWithChildren<RouteComponentProps>;

class Home extends React.PureComponent <HomeProps> {
    render(){
       return <div>
           <div>
              home
           </div>
           <button className="btn btn-primary" onClick={
                () => {
                    this.props.history?.block((param: Location) => `你确定要跳转到${param.pathname}吗`);
                }
            }> 测试prompt--block </button>
       </div>
    }
}

class Profile extends React.PureComponent {
    render(){
        return <div>
            <div>
            profile
            </div>
            {/* <button className="btn btn-primary" onClick={
                () => {
                    this.props.history?.block((param: Location) => `你确定要跳转到${param.pathname}吗`);
                }
            }> 测试prompt--block </button> */}
        </div>
    }
}

class User extends React.PureComponent<RouteComponentProps> {
    render(){
        console.log(this.props, 'this.props');
        return <div>
            user
            <button className="btn btn-primary" onClick={
                () => {
                    this.props.history?.push('/home');
                }
            }> 点击进行路由的切换/home </button>
        </div>
    }
}

// type RootProps =  AnchorHTMLAttributes<HTMLAnchorElement> &
// 	ButtonHTMLAttributes<HTMLButtonElement>;
type RootProps = React.PropsWithChildren<RouteComponentProps & {}>;

class Root extends React.PureComponent<RootProps> {
    render(){
        console.log(this.props, 'this.props');
        return <div>
            root
        </div>
    }
}

// 实现 MenuLink 
// 实现 受保护路由 => 需要进行校验  Protected

// block 阻塞，某一些情况下 当路由发生跳转的时候，进行confirm 提示
// 实现思路就是用一个history 中的变量的值是否存在进行控制 从而从 Router(HashRouter)中进行控制
// 调用 history.block(null | message);

ReactDOM.render(
   <div>
      <Router >
        <>
         <div>
          <MenuLink to='/home'>---home---</MenuLink>
          <br />
          <MenuLink to='/profile'>---profile---</MenuLink>
          <br />
          <MenuLink to='/user'>---user---</MenuLink>
         </div>
         <Switch>
            <Route path='/' component={Root} exact/>
            <Route path='/home' component={Home} exact/>
            <Protected path='/profile' component={Profile}/>
            <Route path='/user/:id' component={User}/>
            <Redirect to='/home'/>
         </Switch>
        </>
      </Router>
   </div>
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