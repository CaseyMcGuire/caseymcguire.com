/**
 * @generated SignedSource<<0e20b83340b3a3125738377f0fef7ba7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UserContextProviderQuery$variables = Record<PropertyKey, never>;
export type UserContextProviderQuery$data = {
  readonly currentUser: {
    readonly isAdmin: boolean;
  } | null | undefined;
};
export type UserContextProviderQuery = {
  response: UserContextProviderQuery$data;
  variables: UserContextProviderQuery$variables;
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
    "name": "UserContextProviderQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserContextProviderQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5ec357e8927a422ac777219f9eb54e4a",
    "id": null,
    "metadata": {},
    "name": "UserContextProviderQuery",
    "operationKind": "query",
    "text": "query UserContextProviderQuery {\n  currentUser {\n    isAdmin\n  }\n}\n"
  }
};
})();

(node as any).hash = "86d624e0ba8662c51c72f1045c2637eb";

export default node;
