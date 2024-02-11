/**
 * @generated SignedSource<<b22ca3c404b237315871d5ef32895c07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MovieHomePageQuery$variables = {};
export type MovieHomePageQuery$data = {
  readonly movieApi: {
    readonly movieList: ReadonlyArray<{
      readonly backdropPath: string | null;
      readonly title: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"MovieAppBackdropImageScroll_movie">;
    } | null> | null;
  } | null;
};
export type MovieHomePageQuery = {
  response: MovieHomePageQuery$data;
  variables: MovieHomePageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "listType",
    "value": "NOW_PLAYING"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "backdropPath",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MovieHomePageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MovieApi",
        "kind": "LinkedField",
        "name": "movieApi",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Movie",
            "kind": "LinkedField",
            "name": "movieList",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MovieAppBackdropImageScroll_movie"
              }
            ],
            "storageKey": "movieList(listType:\"NOW_PLAYING\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MovieHomePageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MovieApi",
        "kind": "LinkedField",
        "name": "movieApi",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Movie",
            "kind": "LinkedField",
            "name": "movieList",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": "movieList(listType:\"NOW_PLAYING\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8c27b6d75e7786c2f19b3e9770d41729",
    "id": null,
    "metadata": {},
    "name": "MovieHomePageQuery",
    "operationKind": "query",
    "text": "query MovieHomePageQuery {\n  movieApi {\n    movieList(listType: NOW_PLAYING) {\n      title\n      backdropPath\n      ...MovieAppBackdropImageScroll_movie\n    }\n  }\n}\n\nfragment MovieAppBackdropImageScroll_movie on Movie {\n  title\n  backdropPath\n}\n"
  }
};
})();

(node as any).hash = "b10e3af07622b851110b33c17589eb68";

export default node;
