import React, { Component } from 'react';
import { Location, LocationDescription, RouteComponentProps, Message} from './';
import RouterContext from './RouterContext';

// 问题1 HashRouter 下怎么实现 RouterContext 中 history replace 方法
interface Props {

}

interface State {
    location: Location;
}

class HashRouter extends Component <Props, State> {

    locationState: any;
    prompt: Message | null = null;

    // 通过 context 进行传值
    // location
    state = {
        location:{
            pathname:window.location.hash?window.location.hash.slice(1):'/',
            state:null,
        },
    }

    componentDidMount(){
        window.addEventListener('hashchange',(event:HashChangeEvent)=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname:window.location.hash.slice(1),
                    state: this.locationState,
                }
            })
        });
        // 默认触发一次
        window.location.hash = window.location.hash || '/';
    }

    render():React.ReactNode {
        let that = this;
        // 本质上 location 和 history 都是 history库 提供的功能
        const value:RouteComponentProps = {
            location: this.state.location, // location 数据在变化 并进行传递;
            history: {
                prompt: null,
                push(to: LocationDescription){
                    if(that.prompt){
                       const allow = window.confirm(that.prompt(typeof to === 'object' ? to : {
                            pathname: to,
                            state: null,
                        } ));
                        if(!allow){
                            return null;
                        }
                    }
                    if(typeof to === 'object'){
                        const { pathname, state } = to;
                        that.locationState = state;
                        window.location.hash = pathname;
                    } else {
                        that.locationState = null;
                        window.location.hash = to;
                    }
                },
                block(param: Message | null) {
                    that.prompt = param;
                }
            },
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