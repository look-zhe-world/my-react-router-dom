import { History, Message } from '../history';
export interface Location {
    pathname: string,
    state:any,
    search?: string;
    hash?: string;
    // key?: LocationKey;
}

// location
// history 
// match  => 组成 RouterCompentProps

export interface Match<Params={}> {
    params?: Params, // 路径参数
    isExact?: boolean;
    path?: string;
    url?: string;
}
// RouterContextValue
export interface RouteComponentProps<Params={}> {
    location?:Location,
    history?: History,
    match?: Match<Params>
}

// 需要一个 RouterCompentProps => 作为 路由渲染的组件的 props 的一部分

export type LocationDescription = string | Location;
export  {
    Message,
};