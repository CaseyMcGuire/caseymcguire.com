import HomePage from "../pages/Home/HomePage";
import * as React from "react";
import ResumePage from "../pages/Resume/Resume";
import IndexPostPage from "../pages/Posts/IndexPostPage";
import { RouteComponentProps } from "react-router-dom";
import CreatePostPage from "../pages/Posts/CreatePostPage";
import SinglePostPage from "../pages/Posts/ShowPostPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import EditPostPage from "../pages/Posts/EditPostPage";
import Page from "../pages/Page/Page";
import TetrisPage from "../pages/Tetris/TetrisPage";
import ProjectsPage from "../pages/Projects/ProjectsPage";
import NftPreview from "../pages/Random/NftPreview/NftPreview";

type AppRoute = {
  path: string,
  render: (routeProps: RouteComponentProps<any>) => JSX.Element
  isGated?: boolean
}

const AppRoutes: Array<AppRoute> = [
  {
    path: "/",
    render: () => <HomePage />
  },
  {
    path: "/resume",
    render: () => <ResumePage />
  },
  {
    path: "/posts",
    render: (routeProps) =>
      <IndexPostPage {...routeProps} />
  },
  {
    path: "/posts/page/:id",
    render: (routeProps) =>
      <IndexPostPage {...routeProps} />
  },
  {
    path: "/posts/new",
    render: () => <CreatePostPage />,
    isGated: true
  },
  {
    path: "/posts/:id",
    render: (routeProps) => <SinglePostPage {...routeProps} />
  },
  {
    path: "/posts/:id/edit",
    render: (routeProps) => <EditPostPage {...routeProps} />,
    isGated: true
  },
  {
    path: "/login",
    render: () => <LoginPage />
  },
  {
    path: "/register",
    render: () => <RegisterPage />
  },
  {
    path: "/tetris",
    render: () => <TetrisPage />
  },
  {
    path: "/404",
    render: () => <Page><div>404</div></Page>
  },
  {
    path: "/500",
    render: () => <Page><div>500: Internal Server Error</div></Page>
  },
  {
    path: "/projects",
    render: () => <ProjectsPage />
  },
  {
    path: "/nft-preview",
    render: () => <NftPreview />
  }
];

export default AppRoutes;

