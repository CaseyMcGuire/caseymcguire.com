import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";
import * as React from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import {WikiRoutes} from "__generated__/routes/WikiRoutes";
import ViewWikiPage from "apps/Wiki/pages/ViewWikiPage";
import EditWikiPage from "apps/Wiki/pages/EditWikiPage";
import UserContextProvider from "components/context/UserContextProvider";
import WikiIndexPage from "apps/Wiki/pages/WikiIndexPage";
import NewWikiPage from "apps/Wiki/pages/NewWikiPage";
import WikiHomePage from "apps/Wiki/pages/WikiHomePage";

const router = createBrowserRouter([
  {
    path: WikiRoutes.WikiHome.path,
    element: <WikiHomePage />
  },
  {
    path: WikiRoutes.NewWikiPage.path,
    element: <NewWikiPage />,
  },
  {
    path: WikiRoutes.WikiIndex.path,
    element: <WikiIndexPage />
  },
  {
    path: WikiRoutes.WikiPage.path,
    element: <ViewWikiPage />
  },
  {
    path: WikiRoutes.EditWikiPage.path,
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
