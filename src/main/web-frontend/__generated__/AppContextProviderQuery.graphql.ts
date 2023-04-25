/**
 * @generated SignedSource<<b112af2abc9cd0cafc0777a5f7914418>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AppContextProviderQuery$variables = {};
export type AppContextProviderQuery$data = {
  readonly currentUser: {
    readonly isAdmin: boolean;
  } | null;
};
export type AppContextProviderQuery = {
  response: AppContextProviderQuery$data;
  variables: AppContextProviderQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppContextProviderQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppContextProviderQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0ff1208d1d442a68fd678cde008e36d2",
    "id": null,
    "metadata": {},
    "name": "AppContextProviderQuery",
    "operationKind": "query",
    "text": "query AppContextProviderQuery {\n  currentUser {\n    isAdmin\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae00ae647bafe236c7c72049e2cea736";

export default node;
