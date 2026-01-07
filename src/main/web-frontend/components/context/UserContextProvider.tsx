import {graphql} from "react-relay";
import * as React from "react";
import UserContext from "components/context/UserContext";
import {useLazyLoadQuery} from "react-relay/hooks";
import {UserContextProviderQuery} from "__generated__/relay/UserContextProviderQuery.graphql";

export default function UserContextProvider(props: {
  children: React.ReactNode
}) {
    const query = graphql`
      query UserContextProviderQuery {
        currentUser {
          isAdmin
        }
      }
    `
  const response = useLazyLoadQuery<UserContextProviderQuery>(query, {});
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