/**
 * @generated SignedSource<<626d92b06e143d2db2522aa4e6d03b21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikisTableQuery$variables = Record<PropertyKey, never>;
export type WikisTableQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WikisTable_wikis">;
};
export type WikisTableQuery = {
  response: WikisTableQuery$data;
  variables: WikisTableQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WikisTableQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "WikisTable_wikis"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WikisTableQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "WikiConnection",
        "kind": "LinkedField",
        "name": "wikis",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "WikiEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GqlWiki",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c0dab449b463e68c1f67200adb425e33",
    "id": null,
    "metadata": {},
    "name": "WikisTableQuery",
    "operationKind": "query",
    "text": "query WikisTableQuery {\n  ...WikisTable_wikis\n}\n\nfragment WikisTable_wikis on Query {\n  wikis {\n    edges {\n      node {\n        name\n        createdAt\n        id\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "5bdde961bd8a3c6d0afea7e8463fe79b";

export default node;
