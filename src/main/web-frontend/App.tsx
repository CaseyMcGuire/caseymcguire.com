import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Page from "./pages/Page/Page";
import ResumePage from "./pages/Resume/Resume";
import SinglePostPage from "./pages/Posts/ShowPostPage";
import HomePage from "./pages/Home/HomePage";
import IndexPostPage from "./pages/Posts/IndexPostPage";

export function App() {
  return (
    <BrowserRouter>
      <Page>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/resume" component={ResumePage} />
          <Route exact path="/posts" component={IndexPostPage} />
          <Route exact path="/posts/:id" component={SinglePostPage} />
          <Route component={NotFoundPage}/>
        </Switch>
      </Page>
    </BrowserRouter>
  );
}

const NotFoundPage = () => {
  return <div>404</div>;
};

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
