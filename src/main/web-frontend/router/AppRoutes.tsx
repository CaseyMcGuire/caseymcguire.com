import HomePage from "pages/Home/HomePage";
import * as React from "react";
import ResumePage from "pages/Resume/Resume";
import IndexPostPage from "pages/Posts/IndexPostPage";
import CreatePostPage from "pages/Posts/CreatePostPage";
import SinglePostPage from "pages/Posts/ShowPostPage";
import LoginPage from "pages/Auth/LoginPage";
import RegisterPage from "pages/Auth/RegisterPage";
import EditPostPage from "pages/Posts/EditPostPage";
import Page from "pages/Page/Page";
import TetrisPage from "pages/Tetris/TetrisPage";
import ProjectsPage from "pages/Projects/ProjectsPage";
import NftPreview from "pages/Random/NftPreview/NftPreview";

type AppRoute = {
  path: string,
  element: React.JSX.Element  | null
  isGated?: boolean
}

const AppRoutes: Array<AppRoute> = [
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

export default AppRoutes;

