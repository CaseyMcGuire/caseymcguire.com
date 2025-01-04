import React, {ReactNode, Suspense} from "react";
import {IEnvironment} from "relay-runtime";
import {RelayConfig} from "relay/RelayConfig";
import {RouterProvider} from "react-router-dom";
import {RelayEnvironmentProvider} from "react-relay/hooks";

type RelayRootProps = {
  fallbackComponent: ReactNode | null,
  relayEnvironment?: IEnvironment,
  children: ReactNode
}

export default function RelayRoot(props: RelayRootProps) {
  const environment = props.relayEnvironment ?? RelayConfig.getEnvironment()
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={props.fallbackComponent}>
        {props.children}
      </Suspense>
    </RelayEnvironmentProvider>
  );
}