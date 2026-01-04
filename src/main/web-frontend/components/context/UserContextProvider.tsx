import {graphql} from "react-relay";
import * as React from "react";
import {AppContextProviderQuery} from "__generated__/relay/AppContextProviderQuery.graphql";
import UserContext from "components/context/UserContext";
import {useLazyLoadQuery} from "react-relay/hooks";

export default function UserContextProvider(props: {
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
    <UserContext.Provider value={context}>
      {componentProps.children}
    </UserContext.Provider>
  );
}