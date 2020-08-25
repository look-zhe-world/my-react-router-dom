import React, { Component } from 'react';
import { LocationDescription, RouteComponentProps } from './';
import Route from './Route';
import Link from './Link';
import  RouterContext from './RouterContext';

// MeunLink 功能就是带有 active classname
// 实现思路 就是 基于 Link 的实现 
// 必须匹配上才会有 active 类名 ，没匹配上 则没有 
// 匹配的逻辑 本质上 就是 同 Route 组件一致 ，使用 Route 组件 去复用该逻辑 

type Props = React.PropsWithChildren<{
    to: LocationDescription,
}>

class MeunLink extends Component<Props> {
    static contextType = RouterContext;

    render():React.ReactNode{
        const { to, } = this.props;
        const path:string = typeof to === 'object' ? to.pathname : to;
        return <Route path={path} children={(childProps: RouteComponentProps)=>{
            console.log(to, 'to' ,childProps, 'childProps' );
            return <Link to={to} className={ childProps.match ? 'active' : '' } >
                {this.props.children}
            </Link>;
        }} />
    }
}

export default MeunLink;