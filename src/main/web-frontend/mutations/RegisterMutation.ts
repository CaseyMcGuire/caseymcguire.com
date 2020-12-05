import {commitMutation} from "relay-runtime";
import {RelayConfig} from "relay/RelayConfig";
import {graphql} from "react-relay";

export function commit(email: string, password: string) {
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

  commitMutation(RelayConfig.getEnvironment(),
    {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        console.log(response)
        console.log(errors)
      }
    });
}
