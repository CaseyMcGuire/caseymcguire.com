import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";
import * as React from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import {WikiRoutes} from "__generated__/routes/WikiRoutes";
import ViewWikiPage from "projects/Wiki/pages/ViewWikiPage";
import EditWikiPage from "projects/Wiki/pages/EditWikiPage";
import UserContextProvider from "components/context/UserContextProvider";

const router = createBrowserRouter([
  {
    path: WikiRoutes.WIKI_INDEX,
    element: <div>hello world</div>
  },
  {
    path: WikiRoutes.WIKI_PAGE,
    element: <ViewWikiPage />
  },
  {
    path: WikiRoutes.EDIT_WIKI_PAGE,
    element: <EditWikiPage />
  }
]);

renderComponent(
  <PageWrapper fallbackComponent={<div>Loading</div>}>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </PageWrapper>
);