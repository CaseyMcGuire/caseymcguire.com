/* tslint:disable */
/* eslint-disable */
/* @relayHash fc958a32e0e5c1ef8b7eda1251e5994f */

import { ConcreteRequest } from "relay-runtime";
export type AppContextProviderQueryVariables = {};
export type AppContextProviderQueryResponse = {
    readonly current_user: {
        readonly isAdmin: boolean;
    } | null;
};
export type AppContextProviderQuery = {
    readonly response: AppContextProviderQueryResponse;
    readonly variables: AppContextProviderQueryVariables;
};



/*
query AppContextProviderQuery {
  current_user {
    isAdmin: is_admin
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
                    "alias": "isAdmin",
                    "name": "is_admin",
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
            "text": "query AppContextProviderQuery {\n  current_user {\n    isAdmin: is_admin\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '5afbb14d2c0c8c0883206ab39c25883c';
export default node;
