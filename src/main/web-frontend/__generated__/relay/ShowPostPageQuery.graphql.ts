/**
 * @generated SignedSource<<355781d23d56c0902eb4223ea0062eaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ShowPostPageQuery$variables = {
  id: number;
};
export type ShowPostPageQuery$data = {
  readonly post: {
    readonly contents: string;
    readonly published_date: string;
    readonly title: string;
  } | null | undefined;
};
export type ShowPostPageQuery = {
  response: ShowPostPageQuery$data;
  variables: ShowPostPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "published_date",
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
    "name": "ShowPostPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShowPostPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7c868f55a718c07fed8fc5cb8522b257",
    "id": null,
    "metadata": {},
    "name": "ShowPostPageQuery",
    "operationKind": "query",
    "text": "query ShowPostPageQuery(\n  $id: Int!\n) {\n  post(id: $id) {\n    title\n    contents\n    published_date\n  }\n}\n"
  }
};
})();

(node as any).hash = "2f1b338bafe198a3cb02dc41f6ac5291";

export default node;
