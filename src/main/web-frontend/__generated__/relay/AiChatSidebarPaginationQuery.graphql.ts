/**
 * @generated SignedSource<<851facc56206de00cf2f5a154b6de2c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AiChatSidebarPaginationQuery$variables = {
  after?: string | null | undefined;
  first?: number | null | undefined;
};
export type AiChatSidebarPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AiChatSidebar_query">;
};
export type AiChatSidebarPaginationQuery = {
  response: AiChatSidebarPaginationQuery$data;
  variables: AiChatSidebarPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 20,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AiChatSidebarPaginationQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "AiChatSidebar_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AiChatSidebarPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AiConversationConnection",
        "kind": "LinkedField",
        "name": "aiConversations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AiConversationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AiConversation",
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
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "AiChatSidebar_aiConversations",
        "kind": "LinkedHandle",
        "name": "aiConversations"
      }
    ]
  },
  "params": {
    "cacheID": "e3d3570bfde7c8ee7e5d955fd9fbf8cf",
    "id": null,
    "metadata": {},
    "name": "AiChatSidebarPaginationQuery",
    "operationKind": "query",
    "text": "query AiChatSidebarPaginationQuery(\n  $after: String\n  $first: Int = 20\n) {\n  ...AiChatSidebar_query_2HEEH6\n}\n\nfragment AiChatSidebar_query_2HEEH6 on Query {\n  aiConversations(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1303e4bdfee9873286bfb9b9240ab548";

export default node;
