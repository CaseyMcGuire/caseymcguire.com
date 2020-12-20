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
          isAdmin: is_admin
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
          if (error != null) {
            return {
              isLoading: false
            }
          }
          else if (props == null) {
            return {
              isLoading: true
            }
          }

          if (props.current_user == null) {
            return {
              isLoading: false
            };
          }
          return {
            isLoading: false,
            user: {
              isAdmin: props.current_user.isAdmin
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