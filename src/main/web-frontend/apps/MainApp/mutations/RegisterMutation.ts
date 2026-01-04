import {commitMutation} from "relay-runtime";
import {RelayConfig} from "relay/RelayConfig";
import {graphql} from "react-relay";
import {RegisterMutation} from "__generated__/relay/RegisterMutation.graphql";

export function commit(email: string, password: string, onCompleted: (success : boolean) => void) {
    const mutation = graphql`
      mutation RegisterMutation(
        $email: String!,
        $password: String!
      ) {
        register(email: $email, password: $password)
      }
    `;

    const variables = {
      email,
      password
    };

  commitMutation<RegisterMutation>(
    RelayConfig.getEnvironment(),
    {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        onCompleted(response.register)
      }
    });
}
