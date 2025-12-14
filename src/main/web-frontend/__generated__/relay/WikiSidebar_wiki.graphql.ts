/**
 * @generated SignedSource<<1ef0ce72a49d420339fb85d15920a1e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebar_wiki$data = {
  readonly sidebar: ReadonlyArray<{
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarFolder_wikiFolder" | "WikiSidebarPage_wikiPage">;
  }>;
  readonly " $fragmentType": "WikiSidebar_wiki";
};
export type WikiSidebar_wiki$key = {
  readonly " $data"?: WikiSidebar_wiki$data;
  readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WikiSidebar_wiki",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "sidebar",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "WikiSidebarPage_wikiPage"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "WikiSidebarFolder_wikiFolder"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Wiki",
  "abstractKey": null
};

(node as any).hash = "f31e0d93c22e99c44c681d85f0c0f380";

export default node;
