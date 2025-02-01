import * as React from "react";
import AppContextProvider from "./components/context/AppContextProvider";
import AppRouter from "./router/AppRouter";
import {RelayConfig} from "relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {renderComponent} from "utils/ReactPageUtils";


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

renderComponent(
  <AppRoot />
);
