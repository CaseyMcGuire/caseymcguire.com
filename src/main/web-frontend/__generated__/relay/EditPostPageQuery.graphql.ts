/**
 * @generated SignedSource<<3dd28a40e0b548d466056629a663cb7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EditPostPageQuery$variables = {
  postId: number;
};
export type EditPostPageQuery$data = {
  readonly post: {
    readonly contents: string;
    readonly title: string;
  } | null | undefined;
};
export type EditPostPageQuery = {
  response: EditPostPageQuery$data;
  variables: EditPostPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "postId"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "post",
    "plural": false,
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
        "name": "contents",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditPostPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditPostPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1e3e43bba55e98fbab6a0c3640a6361d",
    "id": null,
    "metadata": {},
    "name": "EditPostPageQuery",
    "operationKind": "query",
    "text": "query EditPostPageQuery(\n  $postId: Int!\n) {\n  post(id: $postId) {\n    title\n    contents\n  }\n}\n"
  }
};
})();

(node as any).hash = "0930cb2d5485c4194bd7cebcdc2cbedb";

export default node;
