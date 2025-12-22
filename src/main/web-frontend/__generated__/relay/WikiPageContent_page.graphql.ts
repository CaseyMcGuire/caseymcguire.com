/**
 * @generated SignedSource<<16b2c4030f0c952d02e1e463ad549d7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiPageContent_page$data = {
  readonly content: string;
  readonly " $fragmentType": "WikiPageContent_page";
};
export type WikiPageContent_page$key = {
  readonly " $data"?: WikiPageContent_page$data;
  readonly " $fragmentSpreads": FragmentRefs<"WikiPageContent_page">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WikiPageContent_page",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    }
  ],
  "type": "GqlWikiPage",
  "abstractKey": null
};

(node as any).hash = "470b4123fb31f72bc4552bd45a60898f";

export default node;
