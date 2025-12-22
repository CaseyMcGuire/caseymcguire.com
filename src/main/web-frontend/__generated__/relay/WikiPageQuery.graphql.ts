/**
 * @generated SignedSource<<1511b9f089b7c4f52be1476dbb6f419e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiPageQuery$variables = {
  includeWikiPage: boolean;
  wikiName: string;
  wikiPageId?: string | null | undefined;
};
export type WikiPageQuery$data = {
  readonly wiki: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
  } | null | undefined;
  readonly wikiPageById?: {
    readonly " $fragmentSpreads": FragmentRefs<"WikiPageContent_page">;
  } | null | undefined;
};
export type WikiPageQuery = {
  response: WikiPageQuery$data;
  variables: WikiPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeWikiPage"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "wikiName"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "wikiPageId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "wikiName"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "wikiPageId"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "type": "GqlWikiPage",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiPageQuery",
    "selections": [
      {
        "alias": "wiki",
        "args": (v3/*: any*/),
        "concreteType": "GqlWiki",
        "kind": "LinkedField",
        "name": "wikiByName",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WikiSidebar_wiki"
          }
        ],
        "storageKey": null
      },
      {
        "condition": "includeWikiPage",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "GqlWikiPage",
            "kind": "LinkedField",
            "name": "wikiPageById",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "WikiPageContent_page"
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
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
    "name": "WikiPageQuery",
    "selections": [
      {
        "alias": "wiki",
        "args": (v3/*: any*/),
        "concreteType": "GqlWiki",
        "kind": "LinkedField",
        "name": "wikiByName",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GqlWikiFolder",
            "kind": "LinkedField",
            "name": "rootFolder",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "children",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "children",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "children",
                                "plural": true,
                                "selections": [
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v4/*: any*/)
                                    ],
                                    "type": "GqlWikiFolder",
                                    "abstractKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "GqlWikiFolder",
                            "abstractKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "GqlWikiFolder",
                    "abstractKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "condition": "includeWikiPage",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "GqlWikiPage",
            "kind": "LinkedField",
            "name": "wikiPageById",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "ed282e84b4a4a4ed949b06cfff1c76af",
    "id": null,
    "metadata": {},
    "name": "WikiPageQuery",
    "operationKind": "query",
    "text": "query WikiPageQuery(\n  $wikiName: String!\n  $wikiPageId: ID\n  $includeWikiPage: Boolean!\n) {\n  wiki: wikiByName(name: $wikiName) {\n    id\n    name\n    ...WikiSidebar_wiki\n  }\n  wikiPageById(id: $wikiPageId) @include(if: $includeWikiPage) {\n    ...WikiPageContent_page\n    id\n  }\n}\n\nfragment WikiPageContent_page on GqlWikiPage {\n  content\n}\n\nfragment WikiSidebar_wiki on GqlWiki {\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ddbffadbc3491ac1af2aa8713456121";

export default node;
