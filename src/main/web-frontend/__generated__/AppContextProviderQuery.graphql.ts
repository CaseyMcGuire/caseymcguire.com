/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "current_user",
            "plural": false,
            "selections": [
                {
                    "alias": "isAdmin",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "is_admin",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "AppContextProviderQuery",
            "selections": (v0 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "AppContextProviderQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "cacheID": "c8d29343e8b91cddffba72f652df7983",
            "id": null,
            "metadata": {},
            "name": "AppContextProviderQuery",
            "operationKind": "query",
            "text": "query AppContextProviderQuery {\n  current_user {\n    isAdmin: is_admin\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '5afbb14d2c0c8c0883206ab39c25883c';
export default node;
