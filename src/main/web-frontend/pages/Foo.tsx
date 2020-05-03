import * as React from 'react';
import {graphql, QueryRenderer} from "react-relay";
import {RelayConfig} from "../relay/RelayConfig";
import {FooQuery} from "__generated__/FooQuery.graphql";
import FooBar from "./FooBar";
import Page from "./Page/Page";


export default class Foo extends React.Component<{}> {
  render() {
    const query = graphql`
      query FooQuery($baz: String!) {
        bar(baz: $baz)
        ...FooBar_murp
      }
    `;

    return <QueryRenderer<FooQuery>
      environment={RelayConfig.getEnvironment()}
      query={query}
      variables={{baz: 'qwerqwer'}}
      render={({error, props}) => {
        if (props) {
          return <div><div>{props?.bar}</div>
            <FooBar murp={props}/>
          </div>
        }
        return <div/>;
      }
      }
    />;
  }
}



