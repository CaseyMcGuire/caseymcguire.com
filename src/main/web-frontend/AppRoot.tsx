import * as React from "react";
import * as ReactDOM from "react-dom";
import AppContextProvider from "./components/context/AppContextProvider";
import AppRouter from "./router/AppRouter";

export function AppRoot() {
  return (
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  )
}

ReactDOM.render(
  <AppRoot/>,
  document.getElementById("root")
);
