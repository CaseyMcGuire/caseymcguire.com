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
import {CaseyMcGuireRoutes} from "__generated__/routes/CaseyMcGuireRoutes";

type AppRoute = {
  path: string,
  element: React.JSX.Element  | null
  isGated?: boolean
}

const MainAppRoutes: Array<AppRoute> = [
  {
    path: CaseyMcGuireRoutes.BlogIndex.path,
    element: <HomePage />
  },
  {
    path: CaseyMcGuireRoutes.Resume.path,
    element: <ResumePage />
  },
  {
    path: CaseyMcGuireRoutes.PostsIndex.path,
    element: <IndexPostPage />
  },
  {
    path: CaseyMcGuireRoutes.ViewPostsPage.path,
    element: <IndexPostPage />
  },
  {
    path: CaseyMcGuireRoutes.NewPost.path,
    element: <CreatePostPage />,
    isGated: true
  },
  {
    path: CaseyMcGuireRoutes.ViewPost.path,
    element: <SinglePostPage />
  },
  {
    path: CaseyMcGuireRoutes.EditPost.path,
    element: <EditPostPage />,
    isGated: true
  },
  {
    path: CaseyMcGuireRoutes.Login.path,
    element: <LoginPage />
  },
  {
    path: CaseyMcGuireRoutes.Register.path,
    element: <RegisterPage />
  },
  {
    path: CaseyMcGuireRoutes.Tetris.path,
    element: <TetrisPage />
  },
  {
    path: CaseyMcGuireRoutes.NotFound.path,
    element: <Page><div>404</div></Page>
  },
  {
    path: CaseyMcGuireRoutes.InternalServerError.path,
    element: <Page><div>500: Internal Server Error</div></Page>
  },
  {
    path: CaseyMcGuireRoutes.Projects.path,
    element: <ProjectsPage />
  },
  {
    path: CaseyMcGuireRoutes.NftPreview.path,
    element:  <NftPreview />
  }
];

export default MainAppRoutes;
