/**
 * @generated SignedSource<<3265dbc5e57d298a62f9cf566b7eebb9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NestedWikiSidebarFolder_wikiFolder$data = {
  readonly children: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarPage_wikiPage">;
  }>;
  readonly name: string;
  readonly " $fragmentType": "NestedWikiSidebarFolder_wikiFolder";
};
export type NestedWikiSidebarFolder_wikiFolder$key = {
  readonly " $data"?: NestedWikiSidebarFolder_wikiFolder$data;
  readonly " $fragmentSpreads": FragmentRefs<"NestedWikiSidebarFolder_wikiFolder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NestedWikiSidebarFolder_wikiFolder",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "WikiSidebarPage_wikiPage"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "WikiFolder",
  "abstractKey": null
};

(node as any).hash = "eab816b961d9c3e88e22b2753cb4c4ec";

export default node;
