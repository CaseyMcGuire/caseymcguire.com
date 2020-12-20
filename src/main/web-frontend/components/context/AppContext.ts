import * as React from "react";

export type AppContextType = {
  isLoading: boolean,
  user?: {
    email: string,
    role: string | null
  }
}

const AppContext = (React.createContext<AppContextType>({
  isLoading: true
}));

export default AppContext;