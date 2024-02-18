import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import * as React from "react";
import {useContext} from "react";
import AppContext from "../components/context/AppContext";

export default function AppRouter() {
  const context = useContext(AppContext);
  return (
    <BrowserRouter>
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
                      else if (context.user?.isAdmin != true) {
                        return <Redirect to="/" />;
                      }
                    }
                    return route.render(props);
                  }
                  }/>
              );
            })
          }
          <Route path="*" render={_ => <Redirect to={"/404"} />} />
        </Switch>
    </BrowserRouter>
  )
}