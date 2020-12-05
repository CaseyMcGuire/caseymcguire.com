/* tslint:disable */
/* eslint-disable */
/* @relayHash c70c32e67482df7c1b8fb61d21b1978a */

import { ConcreteRequest } from "relay-runtime";
export type RegisterMutationVariables = {
    email: string;
    password: string;
};
export type RegisterMutationResponse = {
    readonly register: boolean;
};
export type RegisterMutation = {
    readonly response: RegisterMutationResponse;
    readonly variables: RegisterMutationVariables;
};



/*
mutation RegisterMutation(
  $email: String!
  $password: String!
) {
  register(email: $email, password: $password)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "email",
            "type": "String!",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "password",
            "type": "String!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "register",
            "args": [
                {
                    "kind": "Variable",
                    "name": "email",
                    "variableName": "email"
                },
                {
                    "kind": "Variable",
                    "name": "password",
                    "variableName": "password"
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "RegisterMutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "RegisterMutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "RegisterMutation",
            "id": null,
            "text": "mutation RegisterMutation(\n  $email: String!\n  $password: String!\n) {\n  register(email: $email, password: $password)\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'dbc39da19b673a3d6afe570bf2e11bb2';
export default node;
