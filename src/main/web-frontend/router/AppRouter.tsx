import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Page from "../pages/Page/Page";
import AppRoutes from "./AppRoutes";
import * as React from "react";
import {useContext} from "react";
import AppContext from "../components/context/AppContext";

export default function AppRouter() {
  const context = useContext(AppContext);
  return (
    <BrowserRouter>
      <Page>
        <Switch>
          {
            AppRoutes.map(route => {
              return (
                <Route
                  key={'key'}
                  exact
                  path={route.path}
                  render={(props) => {
                    if (route.isGated === true) {
                      if (context.isLoading) {
                        return <div />;
                      }
                      else if (context.user?.role !== "ADMIN") {
                        return <Redirect to="/" />;
                      }
                    }
                    return route.render(props);
                  }
                  }/>
              );
            })
          }
          <Route component={NotFoundPage}/>
        </Switch>
      </Page>
    </BrowserRouter>
  )
}

const NotFoundPage = () => {
  return <div>404</div>;
};