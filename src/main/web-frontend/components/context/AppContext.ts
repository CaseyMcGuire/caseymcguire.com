import * as React from "react";

export type AppContextType = {
  user?: {
    isAdmin: boolean
  }
}

const AppContext = (React.createContext<AppContextType>({}));

export default AppContext;