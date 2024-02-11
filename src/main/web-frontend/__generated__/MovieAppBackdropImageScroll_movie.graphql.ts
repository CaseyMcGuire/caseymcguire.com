/**
 * @generated SignedSource<<5cc85d3d461219bd84b2d7a8f8254357>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MovieAppBackdropImageScroll_movie$data = {
  readonly backdropPath: string | null;
  readonly title: string | null;
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
