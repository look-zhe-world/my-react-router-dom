import React, { Component } from 'react';
import RouterContext from './RouterContext';

interface Props {
    path:string,
    component: React.JSXElementConstructor<any>,
}

class Route extends Component<Props> {
    static contextType = RouterContext;

    render():React.ReactNode{
        const { path, component:RouteComponent } = this.props;
        const pathname = this.context.location.pathname;
        if(pathname === path){
            return <RouteComponent />
        }
        return null;
    }
}

export default Route;