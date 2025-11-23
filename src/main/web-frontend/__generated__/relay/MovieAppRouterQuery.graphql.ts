/**
 * @generated SignedSource<<3396353816e46f9959e206901f9936e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MovieAppRouterQuery$variables = Record<PropertyKey, never>;
export type MovieAppRouterQuery$data = {
  readonly movieApi: {
    readonly movie: {
      readonly title: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type MovieAppRouterQuery = {
  response: MovieAppRouterQuery$data;
  variables: MovieAppRouterQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "args": [
          {
            "kind": "Literal",
            "name": "id",
            "value": "464052"
          }
        ],
        "concreteType": "Movie",
        "kind": "LinkedField",
        "name": "movie",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          }
        ],
        "storageKey": "movie(id:\"464052\")"
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MovieAppRouterQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MovieAppRouterQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "862f7d9addcd36779de89a72a2f681fe",
    "id": null,
    "metadata": {},
    "name": "MovieAppRouterQuery",
    "operationKind": "query",
    "text": "query MovieAppRouterQuery {\n  movieApi {\n    movie(id: \"464052\") {\n      title\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d6ee43b3d9cb6d66cd5e80a78baacf5b";

export default node;
