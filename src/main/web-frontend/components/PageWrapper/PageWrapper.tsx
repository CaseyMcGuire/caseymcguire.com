import 'components/PageWrapper/styles.css';
import {ReactNode, Suspense} from "react";
import {RelayConfig} from "relay/RelayConfig";
import {RelayEnvironmentProvider} from "react-relay/hooks";

// Stylex styles will be stored here at build time
import 'components/PageWrapper/styles.css';
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

