import React from 'react';
import { Route , routerRedux} from 'dva/router';
//dva/router => 结合了react-router + react-router-redux(routerRedux) 的api  connected-react-router 的升级版本
//  react-router-redux 的接口通过属性 routerRedux 输出 并增加了push replace 等api
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

interface Props {
    name?:string
}
function Router(props:Props){
    return <div>111</div>
}

export default Router;