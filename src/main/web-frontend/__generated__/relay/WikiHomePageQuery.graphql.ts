/**
 * @generated SignedSource<<a9052a093c56d546cdf80748f80d6b0b>>
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
                    "name": "id",
                    "storageKey": null
                  },
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
    "cacheID": "84eb84a6d68177071d9cae5c7ff5ded8",
    "id": null,
    "metadata": {},
    "name": "WikiHomePageQuery",
    "operationKind": "query",
    "text": "query WikiHomePageQuery {\n  ...WikisTable_wikis\n}\n\nfragment WikisTable_wikis on Query {\n  wikis {\n    edges {\n      node {\n        id\n        name\n        createdAt\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "d92f06cd0152f3ae9ee399baa1bf1a16";

export default node;
