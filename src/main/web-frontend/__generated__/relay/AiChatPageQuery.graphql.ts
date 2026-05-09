/**
 * @generated SignedSource<<390dc819b17a93f179232c831dbe6f20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AiChatPageQuery$variables = Record<PropertyKey, never>;
export type AiChatPageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AiChatSidebar_query">;
};
export type AiChatPageQuery = {
  response: AiChatPageQuery$data;
  variables: AiChatPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AiChatPageQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AiChatSidebar_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AiChatPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "aiConversations(first:20)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "AiChatSidebar_aiConversations",
        "kind": "LinkedHandle",
        "name": "aiConversations"
      }
    ]
  },
  "params": {
    "cacheID": "9172ffcf4b6394598992e99382076f59",
    "id": null,
    "metadata": {},
    "name": "AiChatPageQuery",
    "operationKind": "query",
    "text": "query AiChatPageQuery {\n  ...AiChatSidebar_query\n}\n\nfragment AiChatSidebar_query on Query {\n  aiConversations(first: 20) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f6fafc53a4e9077380b0176df39a774";

export default node;
