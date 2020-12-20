import * as React from "react";

export type AppContextType = {
  isLoading: boolean,
  user?: {
    isAdmin: boolean
  }
}

const AppContext = (React.createContext<AppContextType>({
  isLoading: true
}));

export default AppContext;