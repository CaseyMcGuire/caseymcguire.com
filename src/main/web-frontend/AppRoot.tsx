import * as React from "react";
import * as ReactDOM from "react-dom";
import AppContextProvider from "./components/context/AppContextProvider";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Page from "./pages/Page/Page";
import HomePage from "./pages/Home/HomePage";
import ResumePage from "./pages/Resume/Resume";
import IndexPostPage from "./pages/Posts/IndexPostPage";
import CreatePostPage from "./pages/Posts/CreatePostPage";
import SinglePostPage from "./pages/Posts/ShowPostPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

export function AppRoot() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Page>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/resume" component={ResumePage} />
            <Route exact path="/posts" component={IndexPostPage} />
            <Route exact path="/posts/page/:id" component={IndexPostPage} />
            <Route exact path="/posts/new" component={CreatePostPage} />
            <Route exact path="/posts/:id" component={SinglePostPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route component={NotFoundPage}/>
          </Switch>
        </Page>
      </BrowserRouter>
    </AppContextProvider>
  )
}

const NotFoundPage = () => {
  return <div>404</div>;
};

ReactDOM.render(
  <AppRoot/>,
  document.getElementById("root")
);
