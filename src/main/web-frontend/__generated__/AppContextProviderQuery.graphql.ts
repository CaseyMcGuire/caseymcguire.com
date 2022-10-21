/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AppContextProviderQueryVariables = {};
export type AppContextProviderQueryResponse = {
    readonly currentUser: {
        readonly isAdmin: boolean;
    } | null;
};
export type AppContextProviderQuery = {
    readonly response: AppContextProviderQueryResponse;
    readonly variables: AppContextProviderQueryVariables;
};



/*
query AppContextProviderQuery {
  currentUser {
    isAdmin
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
            "name": "currentUser",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isAdmin",
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
            "cacheID": "0ff1208d1d442a68fd678cde008e36d2",
            "id": null,
            "metadata": {},
            "name": "AppContextProviderQuery",
            "operationKind": "query",
            "text": "query AppContextProviderQuery {\n  currentUser {\n    isAdmin\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'ae00ae647bafe236c7c72049e2cea736';
export default node;
