/**
 * @generated SignedSource<<76a67436f526603a3be6d28594f4c111>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatErrorCode = "CONVERSATION_NOT_FOUND" | "UNKNOWN" | "%future added value";
export type AiChatConversationSendMessageSubscription$variables = {
  connections: ReadonlyArray<string>;
  conversationId?: string | null | undefined;
  message: string;
};
export type AiChatConversationSendMessageSubscription$data = {
  readonly sendMessage: {
    readonly __typename: "AiMessageChunkEvent";
    readonly delta: string;
  } | {
    readonly __typename: "AiMessageCompleteEvent";
    readonly assistantMessageEdge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"AiChatMessage_message">;
      };
    };
    readonly conversationId: string;
    readonly userMessageEdge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"AiChatMessage_message">;
      };
    };
  } | {
    readonly __typename: "AiMessageErrorEvent";
    readonly errorCode: ChatErrorCode;
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "AiMessageStartedEvent";
    readonly conversationId: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type AiChatConversationSendMessageSubscription = {
  response: AiChatConversationSendMessageSubscription$data;
  variables: AiChatConversationSendMessageSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "conversationId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "message"
},
v3 = [
  {
    "kind": "Variable",
    "name": "conversationId",
    "variableName": "conversationId"
  },
  {
    "kind": "Variable",
    "name": "message",
    "variableName": "message"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "conversationId",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/)
  ],
  "type": "AiMessageStartedEvent",
  "abstractKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "delta",
      "storageKey": null
    }
  ],
  "type": "AiMessageChunkEvent",
  "abstractKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "AiMessage",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v9/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AiChatMessage_message"
      }
    ],
    "storageKey": null
  }
],
v11 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "errorCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userFacingErrorMessage",
      "storageKey": null
    }
  ],
  "type": "AiMessageErrorEvent",
  "abstractKey": null
},
v12 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "AiMessage",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v9/*: any*/),
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
      }
    ],
    "storageKey": null
  }
],
v13 = [
  {
    "kind": "Variable",
    "name": "connections",
    "variableName": "connections"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AiChatConversationSendMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "sendMessage",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AiMessageEdge",
                "kind": "LinkedField",
                "name": "userMessageEdge",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AiMessageEdge",
                "kind": "LinkedField",
                "name": "assistantMessageEdge",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              }
            ],
            "type": "AiMessageCompleteEvent",
            "abstractKey": null
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AiChatConversationSendMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "sendMessage",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AiMessageEdge",
                "kind": "LinkedField",
                "name": "userMessageEdge",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "appendEdge",
                "key": "",
                "kind": "LinkedHandle",
                "name": "userMessageEdge",
                "handleArgs": (v13/*: any*/)
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AiMessageEdge",
                "kind": "LinkedField",
                "name": "assistantMessageEdge",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "appendEdge",
                "key": "",
                "kind": "LinkedHandle",
                "name": "assistantMessageEdge",
                "handleArgs": (v13/*: any*/)
              }
            ],
            "type": "AiMessageCompleteEvent",
            "abstractKey": null
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0ae3e0a836b08cc9c1b71b4ea971930e",
    "id": null,
    "metadata": {},
    "name": "AiChatConversationSendMessageSubscription",
    "operationKind": "subscription",
    "text": "subscription AiChatConversationSendMessageSubscription(\n  $conversationId: ID\n  $message: String!\n) {\n  sendMessage(conversationId: $conversationId, message: $message) {\n    __typename\n    ... on AiMessageStartedEvent {\n      conversationId\n    }\n    ... on AiMessageChunkEvent {\n      delta\n    }\n    ... on AiMessageCompleteEvent {\n      conversationId\n      userMessageEdge {\n        cursor\n        node {\n          id\n          ...AiChatMessage_message\n        }\n      }\n      assistantMessageEdge {\n        cursor\n        node {\n          id\n          ...AiChatMessage_message\n        }\n      }\n    }\n    ... on AiMessageErrorEvent {\n      errorCode\n      userFacingErrorMessage\n    }\n  }\n}\n\nfragment AiChatMessage_message on AiMessage {\n  role\n  content\n}\n"
  }
};
})();

(node as any).hash = "0443938ea0d94dd375038ad298a065b4";

export default node;
