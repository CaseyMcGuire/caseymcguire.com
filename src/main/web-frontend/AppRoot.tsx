import * as React from "react";
import * as ReactDOM from "react-dom";
import AppContextProvider from "./components/context/AppContextProvider";
import AppRouter from "./router/AppRouter";
import {RelayConfig} from "./relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";

export function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayConfig.getEnvironment()}>
      <React.Suspense fallback={null}>
        <AppContextProvider>
          <AppRouter />
        </AppContextProvider>
      </React.Suspense>
    </RelayEnvironmentProvider>
  )
}

ReactDOM.render(
  <AppRoot/>,
  document.getElementById("root")
);
