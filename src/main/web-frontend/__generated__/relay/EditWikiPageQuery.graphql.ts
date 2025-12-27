/**
 * @generated SignedSource<<e75e3dc3330d5a505edddfd29ed770f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EditWikiPageQuery$variables = {
  pageId: string;
};
export type EditWikiPageQuery$data = {
  readonly page: {
    readonly content: string;
    readonly id: string;
    readonly name: string;
  } | null | undefined;
};
export type EditWikiPageQuery = {
  response: EditWikiPageQuery$data;
  variables: EditWikiPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "pageId"
  }
],
v1 = [
  {
    "alias": "page",
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "pageId"
      }
    ],
    "concreteType": "GqlWikiPage",
    "kind": "LinkedField",
    "name": "wikiPageById",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditWikiPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditWikiPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "817dbb48a577a3d77e314e3713cbd172",
    "id": null,
    "metadata": {},
    "name": "EditWikiPageQuery",
    "operationKind": "query",
    "text": "query EditWikiPageQuery(\n  $pageId: ID!\n) {\n  page: wikiPageById(id: $pageId) {\n    id\n    name\n    content\n  }\n}\n"
  }
};
})();

(node as any).hash = "cf9b646ef5e44e76a07c63a5d173b6a1";

export default node;
