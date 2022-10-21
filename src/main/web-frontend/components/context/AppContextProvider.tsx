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
        currentUser {
          isAdmin
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

          if (props.currentUser == null) {
            return {
              isLoading: false
            };
          }
          return {
            isLoading: false,
            user: {
              isAdmin: props.currentUser.isAdmin
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