/**
 * @generated SignedSource<<ea3fa9c119ab77886108f524c2d766f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatErrorCode = "CONVERSATION_NOT_FOUND" | "UNKNOWN" | "%future added value";
export type AiChatConversationSendMessageMutation$variables = {
  connections: ReadonlyArray<string>;
  conversationId?: string | null | undefined;
  message: string;
};
export type AiChatConversationSendMessageMutation$data = {
  readonly sendMessage: {
    readonly __typename: "FailedChatResponse";
    readonly errorCode: ChatErrorCode;
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "SuccessfulChatResponse";
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
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type AiChatConversationSendMessageMutation = {
  response: AiChatConversationSendMessageMutation$data;
  variables: AiChatConversationSendMessageMutation$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "AiMessage",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v7/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AiChatMessage_message"
      }
    ],
    "storageKey": null
  }
],
v9 = {
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
  "type": "FailedChatResponse",
  "abstractKey": null
},
v10 = [
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "AiMessage",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v7/*: any*/),
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
v11 = [
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
    "name": "AiChatConversationSendMessageMutation",
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
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AiMessageEdge",
                "kind": "LinkedField",
                "name": "assistantMessageEdge",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              }
            ],
            "type": "SuccessfulChatResponse",
            "abstractKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
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
    "name": "AiChatConversationSendMessageMutation",
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
                "filters": null,
                "handle": "appendEdge",
                "key": "",
                "kind": "LinkedHandle",
                "name": "userMessageEdge",
                "handleArgs": (v11/*: any*/)
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
              },
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "appendEdge",
                "key": "",
                "kind": "LinkedHandle",
                "name": "assistantMessageEdge",
                "handleArgs": (v11/*: any*/)
              }
            ],
            "type": "SuccessfulChatResponse",
            "abstractKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b3f5d8da56ce96887c79adbebf7104bc",
    "id": null,
    "metadata": {},
    "name": "AiChatConversationSendMessageMutation",
    "operationKind": "mutation",
    "text": "mutation AiChatConversationSendMessageMutation(\n  $conversationId: ID\n  $message: String!\n) {\n  sendMessage(conversationId: $conversationId, message: $message) {\n    __typename\n    ... on SuccessfulChatResponse {\n      conversationId\n      userMessageEdge {\n        cursor\n        node {\n          id\n          ...AiChatMessage_message\n        }\n      }\n      assistantMessageEdge {\n        cursor\n        node {\n          id\n          ...AiChatMessage_message\n        }\n      }\n    }\n    ... on FailedChatResponse {\n      errorCode\n      userFacingErrorMessage\n    }\n  }\n}\n\nfragment AiChatMessage_message on AiMessage {\n  role\n  content\n}\n"
  }
};
})();

(node as any).hash = "7bd6237cd24b349a409dc82247fb6c34";

export default node;
