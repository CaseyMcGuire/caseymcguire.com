/* tslint:disable */
/* eslint-disable */
/* @relayHash 818d261bbdee9053f8da095a06bc5ff9 */

import { ConcreteRequest } from "relay-runtime";
export type AppContextProviderQueryVariables = {};
export type AppContextProviderQueryResponse = {
    readonly current_user: {
        readonly email: string;
        readonly role: string | null;
    } | null;
};
export type AppContextProviderQuery = {
    readonly response: AppContextProviderQueryResponse;
    readonly variables: AppContextProviderQueryVariables;
};



/*
query AppContextProviderQuery {
  current_user {
    email
    role
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "current_user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "email",
                    "args": null,
                    "storageKey": null
                },
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "role",
                    "args": null,
                    "storageKey": null
                }
            ]
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "AppContextProviderQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "AppContextProviderQuery",
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "params": {
            "operationKind": "query",
            "name": "AppContextProviderQuery",
            "id": null,
            "text": "query AppContextProviderQuery {\n  current_user {\n    email\n    role\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'e9abe03a3adf5cfd10d9a56ac083100a';
export default node;
