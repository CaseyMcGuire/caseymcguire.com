import {ReactNode, Suspense} from "react";
import {RelayConfig} from "relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {IEnvironment} from "relay-runtime";

type Props = {
  fallbackComponent?: ReactNode | null,
  relayEnvironment?: IEnvironment,
  children: ReactNode
}

export default function PageWrapper(props: Props) {
  const environment = props.relayEnvironment ?? RelayConfig.getEnvironment()
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={props.fallbackComponent}>
        {props.children}
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

