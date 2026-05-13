/**
 * @generated SignedSource<<54465b02943a1b6f16297a171601d4cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AiChatMessageList_query$data = {
  readonly aiConversation: {
    readonly id: string;
    readonly messages: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"AiChatMessage_message">;
        };
      }>;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "AiChatMessageList_query";
};
export type AiChatMessageList_query$key = {
  readonly " $data"?: AiChatMessageList_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"AiChatMessageList_query">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "conversationId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AiChatMessageList_query",
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
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
                    (v0/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "AiChatMessage_message"
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
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "b757a5c2bc24d04ea71821c5c5422910";

export default node;
