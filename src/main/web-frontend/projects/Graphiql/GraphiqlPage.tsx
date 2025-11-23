import 'graphiql/setup-workers/webpack';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import * as React from 'react';
import { GraphiQL } from 'graphiql';
import CsrfUtils from '../../components/csrf/CsrfUtils';
import { renderComponent } from 'utils/ReactPageUtils';
import 'graphiql/style.css';

function GraphiQLPage() {
  const fetcher = createGraphiQLFetcher({
    url: window.location.origin + '/graphql',
    headers: {
      'X-XSRF-TOKEN': CsrfUtils.getToken(),
    },
  });

  return (
      <GraphiQL fetcher={fetcher} />
  );
}

renderComponent(
  <GraphiQLPage />
);
