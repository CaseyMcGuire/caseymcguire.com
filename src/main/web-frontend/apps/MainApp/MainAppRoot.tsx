import * as React from "react";
import UserContextProvider from "components/context/UserContextProvider";
import MainAppRouter from "apps/MainApp/router/MainAppRouter";
import {RelayConfig} from "relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";

export function MainAppRoot() {
  return (
    <PageWrapper>
      <UserContextProvider>
        <MainAppRouter />
      </UserContextProvider>
    </PageWrapper>
  )
}

renderComponent(
  <MainAppRoot />
);
