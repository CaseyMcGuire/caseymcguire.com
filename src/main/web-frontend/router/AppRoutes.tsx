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
  }
];

export default AppRoutes;

