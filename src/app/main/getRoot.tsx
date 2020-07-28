import dva, { DvaInstance, onActionFunc, Hooks } from "dva";
import createLoading from "dva-loading"; // 类似 rudex loading中间件  // 无声明文件，进行declare any声明
import createHistory from "history/createHashHistory"; // 路由配置
import { createLogger } from "redux-logger"; // redux打印日志中间件
import { message } from "antd"; // ts 会对这里进行编译 成require 会导致babel的import插件功能失效
import { Dispatch } from "redux";

message.error("getroot 开始加载");

/**
 *  interface onActionFunc {
    (api: MiddlewareAPI<any>): void,
    }

    function createLogger(options?: ReduxLoggerOptions): Redux.Middleware;

    interface Middleware<
            DispatchExt = {},
            S = any,
            D extends Dispatch = Dispatch>  {
        (api: MiddlewareAPI<D, S>): (
        next: Dispatch<AnyAction>
    ) => (action: any) => any
}
 */

const onAction: onActionFunc[] = [createLogger()];

const onError = (e: Error, dispatch: Dispatch<any>): void => {
  if (e) {
    console.log("onError", e);
  }
};

interface GetRootReturn {
    rootComponent: any,
    dvaInstance: DvaInstance,
}

// Router 类型
function getRoot(Router: any) : GetRootReturn {
  const dvaApp: DvaInstance = dva({
    history: createHistory(),
    onAction,
    onError,
  });
  dvaApp.use(
    createLoading({
      effect: true,
    })
  );
  /**
     * interface Router {
        (api?: RouterAPI): JSX.Element | Object,
        }
     */
  dvaApp.router(Router); //
  const AppRoot = dvaApp.start(); //默认就是hash

  console.log(`${AppRoot}`,'AppRoot');

  //如何在dav start 后重置 history 路由的形式 => hashHistory , browserHistory

  return {
    rootComponent: AppRoot,
    dvaInstance: dvaApp,
  };
}

export default getRoot;

// export default 1;
