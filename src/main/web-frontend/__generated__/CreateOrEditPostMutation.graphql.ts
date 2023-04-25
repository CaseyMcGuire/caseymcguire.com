/**
 * @generated SignedSource<<9398b1bf9d9c76cadf2e79e18d586896>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateOrEditPostMutation$variables = {
  content: string;
  id?: number | null;
  title: string;
};
export type CreateOrEditPostMutation$data = {
  readonly postId: number | null;
};
export type CreateOrEditPostMutation = {
  response: CreateOrEditPostMutation$data;
  variables: CreateOrEditPostMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v3 = [
  {
    "alias": "postId",
    "args": [
      {
        "kind": "Variable",
        "name": "content",
        "variableName": "content"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "kind": "ScalarField",
    "name": "createOrEditPost",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateOrEditPostMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateOrEditPostMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "131dbe643695e7cf4a540bdc19784ca6",
    "id": null,
    "metadata": {},
    "name": "CreateOrEditPostMutation",
    "operationKind": "mutation",
    "text": "mutation CreateOrEditPostMutation(\n  $id: Int\n  $title: String!\n  $content: String!\n) {\n  postId: createOrEditPost(id: $id, content: $content, title: $title)\n}\n"
  }
};
})();

(node as any).hash = "afcad0dfc7bcef17b9b0f0c30eb6571a";

export default node;
