import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Link,
  Outlet,
} from '@modern-js/runtime/router';

const AppLayout = () => (
  <>
    <div>
      <Link to={'/table'}>Table</Link>
    </div>
    <div>
      <Link to={'/dashboard'}>Dashboard</Link>
    </div>
    <div>
      <Link to={'/'}>Root</Link>
    </div>
    <Outlet />
  </>
);

export default () => {
  const { apps, MApp, Table, Dashboard } = useModuleApps();

  // 使用的不是 MApp 组件，需要使用 createBrowserRouter 来创建路由
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route key={'table'} path={'table/*'} element={<Table />} />
        <Route key={'dashboard'} path={'dashboard/*'} element={<Dashboard />} />
      </Route>,
    ),
  );

  return (
    // 方法一：使用 MApp 自动根据配置的 activeWhen 参数加载子应用(本项目配置在 modern.config.ts 中)
    // <BrowserRouter>
    //   <MApp />
    // </BrowserRouter>

    // 方法二：手动写 Route 组件方式加载子应用，方便于需要鉴权等需要前置操作的场景
    <>
      <RouterProvider router={router} />
    </>
  );
};
