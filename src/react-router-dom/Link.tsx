import React, { Component } from 'react';
import { LocationDescription } from './';
import  RouterContext from './RouterContext';
import './Link.css';

type Props = React.PropsWithChildren<{
    to: LocationDescription,
    className?: string,
}>

class Link extends Component<Props> {
    static contextType = RouterContext;

    render():React.ReactNode{
        // href 怎么处理 需要通过知道 Router的类型获知
        return <a 
            onClick={() => {
            this.context.history.push(this.props.to);
            }}
            className={this.props.className || '' }
        >
            {this.props.children}
        </a>
    }
}

export default Link;