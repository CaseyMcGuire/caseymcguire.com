/**
 * @generated SignedSource<<ca239723229bb559f59984ff75499b58>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AiChatPageQuery$variables = {
  conversationId: string;
  hasConversation: boolean;
};
export type AiChatPageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AiChatMessageList_query" | "AiChatSidebar_query">;
};
export type AiChatPageQuery = {
  response: AiChatPageQuery$data;
  variables: AiChatPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "conversationId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasConversation"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
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
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AiChatPageQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AiChatSidebar_query"
      },
      {
        "condition": "hasConversation",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "conversationId",
                "variableName": "conversationId"
              }
            ],
            "kind": "FragmentSpread",
            "name": "AiChatMessageList_query"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AiChatPageQuery",
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "aiConversations(first:20)"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "AiChatSidebar_aiConversations",
        "kind": "LinkedHandle",
        "name": "aiConversations"
      },
      {
        "condition": "hasConversation",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "conversationId"
              }
            ],
            "concreteType": "AiConversation",
            "kind": "LinkedField",
            "name": "aiConversation",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "AiMessageConnection",
                "kind": "LinkedField",
                "name": "messages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AiMessageEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AiMessage",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "role",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "content",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": "messages(first:50)"
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "AiChatMessageList_messages",
                "kind": "LinkedHandle",
                "name": "messages"
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "c75d4efb73faa02a90d4e7e7907af5e8",
    "id": null,
    "metadata": {},
    "name": "AiChatPageQuery",
    "operationKind": "query",
    "text": "query AiChatPageQuery(\n  $conversationId: ID!\n  $hasConversation: Boolean!\n) {\n  ...AiChatSidebar_query\n  ...AiChatMessageList_query_Q3aoS @include(if: $hasConversation)\n}\n\nfragment AiChatMessageList_query_Q3aoS on Query {\n  aiConversation(id: $conversationId) {\n    id\n    messages(first: 50) {\n      edges {\n        node {\n          id\n          ...AiChatMessage_message\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment AiChatMessage_message on AiMessage {\n  role\n  content\n}\n\nfragment AiChatSidebar_query on Query {\n  aiConversations(first: 20) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d4f4deda1204bb1e6bdff9f0dfbf81b0";

export default node;
