/**
 * @generated SignedSource<<02efb6ce925699227d89b29654d8a6e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebarFolder_wikiFolder$data = {
  readonly children: ReadonlyArray<{
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"NestedWikiSidebarFolder_wikiFolder" | "WikiSidebarPage_wikiPage">;
  }>;
  readonly name: string;
  readonly " $fragmentType": "WikiSidebarFolder_wikiFolder";
};
export type WikiSidebarFolder_wikiFolder$key = {
  readonly " $data"?: WikiSidebarFolder_wikiFolder$data;
  readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarFolder_wikiFolder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WikiSidebarFolder_wikiFolder",
  "selections": [
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "children",
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
          "name": "NestedWikiSidebarFolder_wikiFolder"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "WikiFolder",
  "abstractKey": null
};

(node as any).hash = "28abea1ad1f08d00dad221af385c1280";

export default node;
