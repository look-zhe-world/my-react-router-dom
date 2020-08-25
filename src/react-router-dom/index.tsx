import HashRouter  from './HashRouter';
import BrowerRouter from './BrowerRouter';
import Route from './Route';
import Link from './Link';
import Switch from './Switch';
import MenuLink from './MenuLink';
import Redirect from './Redirect';
// 实现redirect 重定向
// 思路就是使用push 实现 内部使用RouterContext api 去实现


// 实现block阻塞 在history方法中实现

export {
    HashRouter,
    BrowerRouter,
    Route,
    Link,
    Switch,
    MenuLink,
    Redirect,
}

export * from './types';