import React, { Component } from 'react';
import { LocationDescription } from './';
import  RouterContext from './RouterContext';

type Props = React.PropsWithChildren<{
    to: LocationDescription,
}>

class Redirect extends Component<Props> {
    static contextType = RouterContext;

    render():React.ReactNode {
        this.context.history.push(this.props.to);
        return null;
    };
}

export default Redirect;