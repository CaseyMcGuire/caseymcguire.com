import { RelayEnvironmentProvider } from "react-relay/hooks";
import * as React from "react";
import {RelayConfig} from "relay/RelayConfig";
import MovieAppRouter from "./MovieAppRouter";
import {renderComponent} from "utils/ReactPageUtils";

export function MovieAppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayConfig.getEnvironment()}>
      <React.Suspense fallback={null}>
        <MovieAppRouter />
      </React.Suspense>
    </RelayEnvironmentProvider>
  )
}

renderComponent(
  <MovieAppRoot />
);