/**
 * @generated SignedSource<<1203740d9284d06692e945c15282206b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiHomePageQuery$variables = Record<PropertyKey, never>;
export type WikiHomePageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WikisTable_wikis">;
};
export type WikiHomePageQuery = {
  response: WikiHomePageQuery$data;
  variables: WikiHomePageQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiHomePageQuery",
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
    "name": "WikiHomePageQuery",
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
    "cacheID": "3d1e92dc58b31ace708ef6a3c1769908",
    "id": null,
    "metadata": {},
    "name": "WikiHomePageQuery",
    "operationKind": "query",
    "text": "query WikiHomePageQuery {\n  ...WikisTable_wikis\n}\n\nfragment WikisTable_wikis on Query {\n  wikis {\n    edges {\n      node {\n        name\n        createdAt\n        id\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "d92f06cd0152f3ae9ee399baa1bf1a16";

export default node;
