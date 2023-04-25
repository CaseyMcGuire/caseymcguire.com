/**
 * @generated SignedSource<<e5dde8237e83daae57dcf5237fe0dc33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MovieAppRouterQuery$variables = {};
export type MovieAppRouterQuery$data = {
  readonly movie: {
    readonly title: string | null;
  } | null;
};
export type MovieAppRouterQuery = {
  response: MovieAppRouterQuery$data;
  variables: MovieAppRouterQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
    "cacheID": "1bc2b9ddbcf98c2518e6b72b6d11e5d2",
    "id": null,
    "metadata": {},
    "name": "MovieAppRouterQuery",
    "operationKind": "query",
    "text": "query MovieAppRouterQuery {\n  movie(id: \"464052\") {\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e3d282f4d95f5c8e3ac067ecc24bc79";

export default node;
