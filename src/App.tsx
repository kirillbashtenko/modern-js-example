import { useModuleApps } from '@modern-js/plugin-garfish/runtime';
import { defineConfig } from '@modern-js/runtime';
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
} from '@modern-js/runtime/router';

const AppLayout = () => (
  <>
    <div>
      <Link to={'/table'}>load file-based sub-app</Link>
    </div>
    <div>
      <Link to={'/dashboard'}>load self-controlled sub-app</Link>
    </div>
    <div>
      <Link to={'/'}>unmount sub-app</Link>
    </div>
    <Outlet />
  </>
);

const App = () => {
  const { apps } = useModuleApps();
  // Instead of using the MApp component, you need to use createBrowserRouter to create the route
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        {apps?.map(app => {
          const { Component } = app;
          // Fuzzy match, path needs to be written in a pattern similar to abc/*
          return (
            <Route
              key={app.name}
              path={`${app.name.toLowerCase()}/*`}
              element={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                <Component
                  loadable={{
                    loading: ({ pastDelay, error }: any) => {
                      if (error) {
                        return <div>error: {error?.message}</div>;
                      } else if (pastDelay) {
                        return <div>loading</div>;
                      } else {
                        return null;
                      }
                    },
                  }}
                />
              }
            />
          );
        })}
      </Route>,
    ),
  );

  return (
    // Use MApp to automatically load sub-applications according to the configured activeWhen parameters (this project is configured in modern.config.ts)
    // <BrowserRouter>
    //   <MApp />
    // </BrowserRouter>

    // Manually write the Route component to load the sub-application, which is convenient for scenarios that require pre-operation such as authentication
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default defineConfig(App, {
  masterApp: {
    manifest: {
      getAppList: async () => {
        // get from remote api
        return [
          {
            name: 'Table',
            entry: 'http://localhost:8001',
            // activeWhen: '/table',
          },
          {
            name: 'Dashboard',
            entry: 'http://localhost:8002',
            // activeWhen: '/dashboard',
          },
        ];
      },
    },
  },
});
