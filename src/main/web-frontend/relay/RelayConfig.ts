import {Environment, Network, RecordSource, RequestParameters, Store, Variables} from "relay-runtime";
import CsrfUtils from "../components/csrf/CsrfUtils";

export class RelayConfig {
  static getEnvironment(): Environment {
    return new Environment({
      network: Network.create(this.fetchQuery),
      store: new Store(new RecordSource())
    });

  }

  private static fetchQuery(
    operation: RequestParameters,
    variables: Variables
  ) {

    const csrfToken = CsrfUtils.getToken();
    const csrfHeader = CsrfUtils.getHeader();
    return fetch("/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [csrfHeader]: csrfToken
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => response.json())
  }
}