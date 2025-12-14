/**
 * @generated SignedSource<<4e8ac9647045a031fe33f4f8542c471a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebarPage_wikiPage$data = {
  readonly name: string;
  readonly " $fragmentType": "WikiSidebarPage_wikiPage";
};
export type WikiSidebarPage_wikiPage$key = {
  readonly " $data"?: WikiSidebarPage_wikiPage$data;
  readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarPage_wikiPage">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WikiSidebarPage_wikiPage",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "WikiPage",
  "abstractKey": null
};

(node as any).hash = "75c378459a623808c83b43878276f2f4";

export default node;
