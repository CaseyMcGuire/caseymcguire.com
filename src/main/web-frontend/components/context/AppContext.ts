import * as React from "react";

export type AppContextType = {
  user?: {
    email: string,
    role: string | null
  }
}

const AppContext = (React.createContext<AppContextType>({}))

export default AppContext