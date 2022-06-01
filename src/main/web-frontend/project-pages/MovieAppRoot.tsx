import { RelayEnvironmentProvider } from "react-relay/hooks";
import * as React from "react";
import {RelayConfig} from "../relay/RelayConfig";
import MovieAppRouter from "./MovieAppRouter";
import * as ReactDOM from "react-dom";

export function MovieAppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayConfig.getEnvironment()}>
      <React.Suspense fallback={null}>
        <MovieAppRouter />
      </React.Suspense>
    </RelayEnvironmentProvider>
  )
}

ReactDOM.render(
  <MovieAppRoot />,
  document.getElementById("root")
);