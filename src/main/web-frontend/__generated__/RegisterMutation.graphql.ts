/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "email"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "password"
        } as any)
    ], v1 = [
        ({
            "alias": null,
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
            "kind": "ScalarField",
            "name": "register",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "RegisterMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "RegisterMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "a45d2ae975ab2f3912d8520a9984606d",
            "id": null,
            "metadata": {},
            "name": "RegisterMutation",
            "operationKind": "mutation",
            "text": "mutation RegisterMutation(\n  $email: String!\n  $password: String!\n) {\n  register(email: $email, password: $password)\n}\n"
        }
    } as any;
})();
(node as any).hash = 'dbc39da19b673a3d6afe570bf2e11bb2';
export default node;
