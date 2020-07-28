import React, { Component } from 'react';
import { Location } from './';
import RouterContext from './RouterContext';

interface Props {

}

interface State {
    location: Location;
}

class HashRouter extends Component <Props, State> {

    // 通过 context 进行传值
    // location
    state = {
        location:{
            pathname:window.location.hash?window.location.hash.slice(1):'/',
            state:null,
        }
    }

    componentDidMount(){
        window.addEventListener('hashchange',(event:HashChangeEvent)=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname:window.location.hash.slice(1),
                }
            })
        });
        // 默认触发一次
        window.location.hash = window.location.hash || '/';
    }

    render():React.ReactNode {
        const value = {
            location: this.state.location,
        }
        console.log(value,'value');
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        );
    }
}

export default HashRouter;