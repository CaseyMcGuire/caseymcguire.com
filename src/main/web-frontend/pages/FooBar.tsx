import {createFragmentContainer, graphql} from "react-relay";
import * as React from "react";
import {FooBar_murp} from "__generated__/FooBar_murp.graphql";

class FooBar extends React.Component<{murp: FooBar_murp}> {
  render() {
    return <div>{this.props.murp.foo}</div>
  }
}

export default createFragmentContainer(FooBar, {
  murp: graphql`
    fragment FooBar_murp on Query {
      foo
    }
  `
})