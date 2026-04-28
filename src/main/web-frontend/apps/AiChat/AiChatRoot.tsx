import * as React from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import {renderComponent} from "utils/ReactPageUtils";
import AiChatHomePage from "apps/AiChat/pages/AiChatHomePage";
import {AIChatRoutes} from "__generated__/routes/AIChatRoutes";

const router = createBrowserRouter([
  {
    path: AIChatRoutes.AI_CHAT_INDEX,
    element: <AiChatHomePage />,
  },
]);

renderComponent(<RouterProvider router={router} />);
