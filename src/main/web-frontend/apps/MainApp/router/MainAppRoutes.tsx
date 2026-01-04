import HomePage from "apps/MainApp/pages/Home/HomePage";
import * as React from "react";
import ResumePage from "apps/MainApp/pages/Resume/Resume";
import IndexPostPage from "apps/MainApp/pages/Posts/IndexPostPage";
import CreatePostPage from "apps/MainApp/pages/Posts/CreatePostPage";
import SinglePostPage from "apps/MainApp/pages/Posts/ShowPostPage";
import LoginPage from "apps/MainApp/pages/Auth/LoginPage";
import RegisterPage from "apps/MainApp/pages/Auth/RegisterPage";
import EditPostPage from "apps/MainApp/pages/Posts/EditPostPage";
import Page from "apps/MainApp/components/Page";
import TetrisPage from "apps/MainApp/pages/Tetris/TetrisPage";
import ProjectsPage from "apps/MainApp/pages/Projects/ProjectsPage";
import NftPreview from "apps/MainApp/pages/Random/NftPreview/NftPreview";

type AppRoute = {
  path: string,
  element: React.JSX.Element  | null
  isGated?: boolean
}

const MainAppRoutes: Array<AppRoute> = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/resume",
    element: <ResumePage />
  },
  {
    path: "/posts",
    element: <IndexPostPage />
  },
  {
    path: "/posts/page/:id",
    element: <IndexPostPage />
  },
  {
    path: "/posts/new",
    element: <CreatePostPage />,
    isGated: true
  },
  {
    path: "/posts/:id",
    element: <SinglePostPage />
  },
  {
    path: "/posts/:id/edit",
    element: <EditPostPage />,
    isGated: true
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/tetris",
    element: <TetrisPage />
  },
  {
    path: "/404",
    element: <Page><div>404</div></Page>
  },
  {
    path: "/500",
    element: <Page><div>500: Internal Server Error</div></Page>
  },
  {
    path: "/projects",
    element: <ProjectsPage />
  },
  {
    path: "/nft-preview",
    element:  <NftPreview />
  }
];

export default MainAppRoutes;

