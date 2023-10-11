import "@mantine/core/styles.css";
import {
  ActionFunction,
  BrowserRouter,
  LoaderFunction,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import Header from "@/components/Header/Header";
import { NothingFoundBackground } from "@/components/NothingFoundBackground/NothingFoundBackground";
import { Auth0ProviderWithNavigate } from "@/components/Auth0ProviderWithNavigate";

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType;
}

interface IRoute extends RouteCommon {
  path: string;
  Element: React.ComponentType;
  isAuthenticated?: boolean;
}

interface Pages {
  [key: string]: {
    default: React.ComponentType;
  } & RouteCommon;
}

const App = () => {
  const queryClient = new QueryClient();
  const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
  const authenticatedPages = new Set(["properties/create"]);
  const routes: IRoute[] = [];

  for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
    if (!fileName) {
      continue;
    }

    const normalizedPathName = fileName.includes("$")
      ? fileName.replace("$", ":")
      : fileName.replace(/\/index/, "");

    routes.push({
      path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
      Element: pages[path].default,
      loader: pages[path]?.loader as LoaderFunction | undefined,
      action: pages[path]?.action as ActionFunction | undefined,
      ErrorBoundary: pages[path]?.ErrorBoundary,
      isAuthenticated: authenticatedPages.has(fileName),
    });
  }
  const wrapElement = (
    Element: React.ComponentType,
    isAuthenticated: boolean,
  ) => {
    return isAuthenticated
      ? () => <AuthenticatedRoute element={<Element />} />
      : () => <Element />;
  };

  routes.push({
    path: "*",
    Element: NothingFoundBackground,
    isAuthenticated: false,
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <Header links={[{ link: "/test", label: "Menu Item" }]} />
          <Routes>
            {routes.map(({ path, Element, ErrorBoundary, isAuthenticated }) => (
              <Route
                key={path}
                path={path}
                element={wrapElement(Element, !!isAuthenticated)()}
                {...(ErrorBoundary && { errorElement: <ErrorBoundary /> })}
              />
            ))}
          </Routes>
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
