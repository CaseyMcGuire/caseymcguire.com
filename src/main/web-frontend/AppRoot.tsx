import * as React from "react";
import UserContextProvider from "components/context/UserContextProvider";
import AppRouter from "./router/AppRouter";
import {RelayConfig} from "relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";

export function AppRoot() {
  return (
    <PageWrapper>
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </PageWrapper>
  )
}

renderComponent(
  <AppRoot />
);
