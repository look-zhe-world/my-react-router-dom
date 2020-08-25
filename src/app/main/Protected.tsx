import React, { Component } from 'react';
import { Route, Redirect, RouteComponentProps } from '../../react-router-dom';

interface ProtectedProps  {
    path:string,
    exact?: boolean,
    component: React.ComponentType<RouteComponentProps<any>>,  // 需要修改下 ComponentType
}

class Protected extends Component<ProtectedProps> {
    render() {
        const { path, component:RouteComponent } = this.props;
        return (
            <Route path={path} render={
                (routerProps: RouteComponentProps) => {
                  return  localStorage.getItem('id') ? <RouteComponent {...routerProps}/> : <Redirect to= {routerProps?.location?.pathname || '/'}/>
                }
            }/>
        );
    }
}

export default Protected;