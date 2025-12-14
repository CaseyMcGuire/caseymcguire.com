import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";
import * as React from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import {WikiRoutes} from "__generated__/routes/WikiRoutes";
import WikiPage from "projects/Wiki/pages/WikiPage";

const router = createBrowserRouter([
  {
    path: WikiRoutes.WIKI_INDEX,
    element: <div>hello world</div>
  },
  {
    path: WikiRoutes.WIKI_PAGE,
    element: <WikiPage />
  }
]);

renderComponent(
  <PageWrapper fallbackComponent={<div>Loading</div>}>
    <RouterProvider router={router} />
  </PageWrapper>
);