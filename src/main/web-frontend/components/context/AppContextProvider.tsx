import {graphql, QueryRenderer} from "react-relay";
import * as React from "react";
import {RelayConfig} from "../../relay/RelayConfig";
import {AppContextProviderQuery} from "../../__generated__/AppContextProviderQuery.graphql";
import AppContext from "./AppContext";

export default function AppContextProvider(props: {
  children: React.ReactNode
}) {
    const query = graphql`
      query AppContextProviderQuery {
        current_user {
          email
          role
        }
      }
    `
  const componentProps = props;
  return (
    <QueryRenderer<AppContextProviderQuery>
      environment={RelayConfig.getEnvironment()}
      query={query}
      render={({error, props}) => {
        const context = (() => {
          if (props?.current_user == null) {
            return {};
          }
          return {
            user: {
              email: props.current_user.email,
              role: props.current_user.role
            }
          }
        })();

        return (
          <AppContext.Provider value={context}>
            {componentProps.children}
          </AppContext.Provider>
        )
      }}
      variables={{}}/>
  );
}