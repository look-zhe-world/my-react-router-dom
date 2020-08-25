import React, { Component } from 'react';
import { Location, LocationDescription, RouteComponentProps, Message} from './';
import RouterContext from './RouterContext';

// 给全局对象添加属性
declare global {
    interface Window {
        onpushstate: (param:{state:any, pathname: string, type: 'pushstate', title?: string}) => void;
    }
}

// 问题1 HashRouter 下怎么实现 RouterContext 中 history replace 方法
interface Props {

}

interface State {
    location: Location;
}

class BrowerRouter extends Component <Props, State> {

    locationState: any;
    prompt: Message | null = null;

    // 通过 context 进行传值
    // location
    state = {
        location:{
            pathname: '/',
            state:null,
        },
    }

    componentDidMount(){
        const that = this;
        // BrowerRouter => popstate 时间可以监听
        window.onpopstate = function(event: PopStateEvent){
            event.stopPropagation();
            // 改变location 中 pathname数据
            that.setState({
                location: {
                    ...that.state.location,
                    pathname: document.location.pathname,
                    state: event.state
                }
            });
        };
        // 使用aop 编程思想重写 history.pushState 方法;

        window.onpushstate = function(param:{state:any, pathname: string, type: 'pushstate', title?: string}){  // 需要给window 添加全局属性
            // console.log(event, 'event');
            // 改变location 中 pathname数据
            const { pathname, state } = param
            that.setState({
                location: {
                    ...that.state.location,
                    pathname,
                    state,
                }
            });
        };
     
         // 模拟onpopstate => onpushstate
         (function(history){
             // 重写 history.pushState() 方法  
             const pushState = history.pushState;
             history.pushState = function(state,title,pathname){
                 if(typeof window.onpushstate === 'function'){
                     window.onpushstate({state,title,pathname: pathname || '',type:'pushstate'});
                 };
                 return pushState.call(history,state,title,pathname);
             };
         })(window.history);

        // window.addEventListener('hashchange',(event:HashChangeEvent)=>{
        //     this.setState({
        //         location:{
        //             ...this.state.location,
        //             pathname:window.location.hash.slice(1),
        //             state: this.locationState,
        //         }
        //     })
        // });
        // // 默认触发一次
        // window.location.hash = window.location.hash || '/';
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
                        // window.location.hash = pathname;
                        window.history.pushState(state, '', pathname);
                    } else {
                        that.locationState = null;
                        // window.location.hash = to;
                        window.history.pushState(null, '', to);
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

export default BrowerRouter;