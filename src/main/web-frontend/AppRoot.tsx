import * as React from "react";
import AppContextProvider from "./components/context/AppContextProvider";
import AppRouter from "./router/AppRouter";
import {RelayConfig} from "relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";

export function AppRoot() {
  return (
    <PageWrapper>
      <AppContextProvider>
        <AppRouter />
      </AppContextProvider>
    </PageWrapper>
  )
}

renderComponent(
  <AppRoot />
);
