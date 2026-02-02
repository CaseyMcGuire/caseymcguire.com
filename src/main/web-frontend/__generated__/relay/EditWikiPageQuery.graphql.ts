/**
 * @generated SignedSource<<305a25e7e460fcf10781b7134ee002df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EditWikiPageQuery$variables = {
  pageId: string;
  wikiId: string;
};
export type EditWikiPageQuery$data = {
  readonly page: {
    readonly content: string;
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly wiki: {
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "wikiId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
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
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "wikiId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditWikiPageQuery",
    "selections": [
      (v3/*: any*/),
      {
        "alias": "wiki",
        "args": (v4/*: any*/),
        "concreteType": "GqlWiki",
        "kind": "LinkedField",
        "name": "wikiById",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditWikiPageQuery",
    "selections": [
      (v3/*: any*/),
      {
        "alias": "wiki",
        "args": (v4/*: any*/),
        "concreteType": "GqlWiki",
        "kind": "LinkedField",
        "name": "wikiById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b8206ac62a4f343bdb286b19bc27f03",
    "id": null,
    "metadata": {},
    "name": "EditWikiPageQuery",
    "operationKind": "query",
    "text": "query EditWikiPageQuery(\n  $pageId: ID!\n  $wikiId: ID!\n) {\n  page: wikiPageById(id: $pageId) {\n    id\n    name\n    content\n  }\n  wiki: wikiById(id: $wikiId) {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e8bb65559a6a3ff892c195e824f7405f";

export default node;
