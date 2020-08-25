import React, { Component } from 'react';
import { LocationDescription } from './';
import  RouterContext from './RouterContext';
import { pathToRegexp, Key } from 'path-to-regexp';

interface Props {
    children: Array<React.ReactElement> 
}
class Switch extends Component<Props> {
    static contextType = RouterContext;

    render(){
        // href 怎么处理 需要通过知道 Router的类型获知
       const pathname = this.context.location.pathname;
    //    let children: Array<React.ReactElement> | React.ReactElement ;
    //    const children = Array.isArray(this.props.children) ? this.props.children :  [this.props.children];
       const children =  this.props.children;
       for(let i=0;i<children.length; i++){
        const child = children[i];
        // console.log(child,'child',i);
        const { path = '/', exact = false } = child.props;
        const param: Key[] = [];
        const regexp = pathToRegexp(path, param, { end: exact });
        const result = pathname.match(regexp);
        if(result){
            return children[i];
        }
       }
       return null;
    }
}

export default Switch;