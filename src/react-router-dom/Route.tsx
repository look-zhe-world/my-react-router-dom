import React, { Component, memo } from 'react';
import { pathToRegexp, Key } from 'path-to-regexp';
import RouterContext from './RouterContext';
import { Location, LocationDescription, RouteComponentProps, Match} from './';

interface Props {
    path?:string,
    exact?: boolean,
    // component?: React.JSXElementConstructor<any>,  // 需要修改下 ComponentType
    component?: React.ComponentType<RouteComponentProps<any>>,  // 需要修改下 ComponentType
    render?: (prop: RouteComponentProps<any>) => React.ReactNode,  // 属于匹配渲染
    children?: (prop: RouteComponentProps<any>) => React.ReactNode,  // children 是属于必然渲染
}

class Route extends Component<Props> {
    static contextType = RouterContext;

    render():React.ReactNode{
        const { path = '/', component: RouteComponent, render: renderFunc, children: renderChild, exact = false } = this.props;
        const pathname = this.context.location.pathname;
        const keys: Key[] = [];
        const regexp = pathToRegexp(path, keys, { end: exact });
        const result = pathname.match(regexp);
        if(result){
            const [resultPath, ...arg ] = result;
            const keysParams = keys.map(item=>item.name) as string[] ;
            // if(pathname === path){
            let memo: Record<string,any> = {};
            const params = keysParams.reduce((memo: Record<string,any>, item: string, index: number)=>{
                memo[item] = arg[index];
                return memo;
            },memo);
            const matchResult:Match<typeof params> = {
                params,
                isExact: path === pathname,
                path: path,
                url: pathname,
            }
            const routePorps: RouteComponentProps<typeof params> = {
                location: this.context.locatin,
                history: this.context.history,
                match: matchResult
            }
            // 进行判断
            if(RouteComponent){
                // 对组件进行传递 // 类似withRouter 一样进行传递 context数据
                // 需要将context 的数据进行传递过去
                return <RouteComponent {...routePorps}/>
            } else if(renderFunc){
                return renderFunc(routePorps);
            } else if(renderChild){
                return renderChild(routePorps);
            } else {
                return null;
            }
        } else {
            if(renderChild){
                return renderChild({});
            }
            return null;
        }
    }
}

// type a = Record<string,any>;

// type b = {
    // // in keyof 
//     [K in string]:any
// }

// let obj: b = {
//     a: 1,
//     1: 2,
// }

export default Route;