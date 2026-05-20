import {Environment, GraphQLResponse, Network, Observable, RecordSource, RequestParameters, Store, Variables} from "relay-runtime";
import {createClient} from "graphql-sse";
import CsrfUtils from "../components/csrf/CsrfUtils";

const sseClient = createClient({
  url: "/graphql",
  credentials: "include",
  headers: () => ({
    [CsrfUtils.getHeader()]: CsrfUtils.getToken(),
  }),
});

export class RelayConfig {
  static getEnvironment(): Environment {
    return new Environment({
      network: Network.create(RelayConfig.fetchQuery, RelayConfig.subscribe),
      store: new Store(new RecordSource()),
    });
  }

  private static fetchQuery(
    operation: RequestParameters,
    variables: Variables,
  ) {
    const csrfToken = CsrfUtils.getToken();
    const csrfHeader = CsrfUtils.getHeader();
    return fetch("/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [csrfHeader]: csrfToken,
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => response.json());
  }

  private static subscribe(operation: RequestParameters, variables: Variables) {
    return Observable.create<GraphQLResponse>((sink) => {
      return sseClient.subscribe(
        {
          operationName: operation.name,
          query: operation.text ?? '',
          variables,
        },
        {
          next: (value) => sink.next(value as GraphQLResponse),
          complete: () => sink.complete(),
          error: (err) => sink.error(err instanceof Error ? err : new Error(String(err))),
        },
      );
    });
  }
}