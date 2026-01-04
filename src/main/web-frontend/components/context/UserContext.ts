import * as React from "react";

export type UserContextType = {
  user?: {
    isAdmin: boolean
  }
}

const UserContext = (React.createContext<UserContextType>({}));

export default UserContext;