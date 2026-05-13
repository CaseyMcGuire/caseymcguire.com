/**
 * @generated SignedSource<<2c1b341f161433bcb0efb883ecba5054>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ChatErrorCode = "CONVERSATION_NOT_FOUND" | "UNKNOWN" | "%future added value";
export type AiChatConversationSendMessageMutation$variables = {
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
    readonly conversationId: string;
    readonly reply: string;
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "conversationId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "message"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
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
    "concreteType": null,
    "kind": "LinkedField",
    "name": "sendMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "conversationId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reply",
            "storageKey": null
          }
        ],
        "type": "SuccessfulChatResponse",
        "abstractKey": null
      },
      {
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AiChatConversationSendMessageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AiChatConversationSendMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bbf2ec97ff63a3489dd858f8aac4be4f",
    "id": null,
    "metadata": {},
    "name": "AiChatConversationSendMessageMutation",
    "operationKind": "mutation",
    "text": "mutation AiChatConversationSendMessageMutation(\n  $conversationId: ID\n  $message: String!\n) {\n  sendMessage(conversationId: $conversationId, message: $message) {\n    __typename\n    ... on SuccessfulChatResponse {\n      conversationId\n      reply\n    }\n    ... on FailedChatResponse {\n      errorCode\n      userFacingErrorMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9af77d199e1027a9ef07181179aac9bf";

export default node;
