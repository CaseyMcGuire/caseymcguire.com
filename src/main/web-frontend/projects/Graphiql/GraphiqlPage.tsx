import {createGraphiQLFetcher} from "@graphiql/toolkit";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {GraphiQL} from "graphiql";
import 'graphiql/graphiql.css';
import CsrfUtils from "../../components/csrf/CsrfUtils";

function GraphiQLPage() {
  const fetcher = createGraphiQLFetcher({
    url: window.location.origin + '/graphql',
  });
  return (
    <GraphiQL headers={getHeaders()} fetcher={fetcher} />
  )
}

function getHeaders(): string {
  const csrfToken = CsrfUtils.getToken();
  return JSON.stringify(
    {
      'X-XSRF-TOKEN': csrfToken
    },
    null,
    2
  )
}



ReactDOM.render(
  <GraphiQLPage />,
  document.getElementById("root")
);
