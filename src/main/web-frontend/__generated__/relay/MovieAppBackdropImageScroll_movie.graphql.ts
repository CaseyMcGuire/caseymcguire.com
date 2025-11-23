/**
 * @generated SignedSource<<b3dff74c81816a902d33e4a01d5e9148>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MovieAppBackdropImageScroll_movie$data = {
  readonly backdropPath: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "MovieAppBackdropImageScroll_movie";
};
export type MovieAppBackdropImageScroll_movie$key = {
  readonly " $data"?: MovieAppBackdropImageScroll_movie$data;
  readonly " $fragmentSpreads": FragmentRefs<"MovieAppBackdropImageScroll_movie">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MovieAppBackdropImageScroll_movie",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "backdropPath",
      "storageKey": null
    }
  ],
  "type": "Movie",
  "abstractKey": null
};

(node as any).hash = "5a82f0d00aead206038c15dc2f6424c7";

export default node;
