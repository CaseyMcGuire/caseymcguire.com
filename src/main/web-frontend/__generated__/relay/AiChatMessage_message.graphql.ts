/**
 * @generated SignedSource<<8fffdf4333929ec01dbc761d285ea2ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AiMessageRole = "ASSISTANT" | "SYSTEM" | "TOOL" | "USER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AiChatMessage_message$data = {
  readonly content: string;
  readonly role: AiMessageRole;
  readonly " $fragmentType": "AiChatMessage_message";
};
export type AiChatMessage_message$key = {
  readonly " $data"?: AiChatMessage_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"AiChatMessage_message">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AiChatMessage_message",
  "selections": [
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
  "type": "AiMessage",
  "abstractKey": null
};

(node as any).hash = "dcad8e6dc2feac8586cab749638dd5f5";

export default node;
