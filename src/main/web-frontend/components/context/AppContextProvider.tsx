import {graphql} from "react-relay";
import * as React from "react";
import {AppContextProviderQuery} from "__generated__/relay/AppContextProviderQuery.graphql";
import AppContext from "./AppContext";
import {useLazyLoadQuery} from "react-relay/hooks";

export default function AppContextProvider(props: {
  children: React.ReactNode
}) {
    const query = graphql`
      query AppContextProviderQuery {
        currentUser {
          isAdmin
        }
      }
    `
  const response = useLazyLoadQuery<AppContextProviderQuery>(query, {});
  const componentProps = props;

  const user = response.currentUser == null ? null : {
    user: {
      isAdmin: response.currentUser?.isAdmin == true
    }
  }

  const context = {
    ...user
  }

  return (
    <AppContext.Provider value={context}>
      {componentProps.children}
    </AppContext.Provider>
  );
}