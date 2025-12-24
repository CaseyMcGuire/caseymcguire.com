/**
 * @generated SignedSource<<abcdc8f7037f992a0eb694e99ad3f1cb>>
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
  readonly name: string;
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
      "name": "name",
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
  "type": "GqlWikiPage",
  "abstractKey": null
};

(node as any).hash = "4d52b81fe6436ded2da5ca3c11118852";

export default node;
