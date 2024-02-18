import {graphql, QueryRenderer} from "react-relay";
import * as React from "react";
import {RelayConfig} from "../../relay/RelayConfig";
import {AppContextProviderQuery} from "../../__generated__/AppContextProviderQuery.graphql";
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

  const context = {
    user: {
      isAdmin: response.currentUser?.isAdmin == true
    }
  }

  return (
    <AppContext.Provider value={context}>
      {componentProps.children}
    </AppContext.Provider>
  );
}