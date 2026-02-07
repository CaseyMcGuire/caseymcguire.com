/**
 * @generated SignedSource<<c139a20ac56ae60051a02961c369e93c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewWikiPageQuery$variables = {
  wikiId: string;
  wikiPageId: string;
};
export type ViewWikiPageQuery$data = {
  readonly wiki: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarFragment_wiki">;
  } | null | undefined;
  readonly wikiPageById: {
    readonly " $fragmentSpreads": FragmentRefs<"WikiPageContent_page">;
  } | null | undefined;
};
export type ViewWikiPageQuery = {
  response: ViewWikiPageQuery$data;
  variables: ViewWikiPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "wikiId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "wikiPageId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "wikiId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "type": "GqlWikiPage",
  "abstractKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "wikiPageId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewWikiPageQuery",
    "selections": [
      {
        "alias": "wiki",
        "args": (v1/*: any*/),
        "concreteType": "GqlWiki",
        "kind": "LinkedField",
        "name": "wikiById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineDataFragmentSpread",
            "name": "WikiSidebarFragment_wiki",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "GqlWikiFolder",
                "kind": "LinkedField",
                "name": "rootFolder",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "children",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "children",
                            "plural": true,
                            "selections": [
                              (v4/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v2/*: any*/),
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": null,
                                    "kind": "LinkedField",
                                    "name": "children",
                                    "plural": true,
                                    "selections": [
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "GqlWikiFolder",
                                "abstractKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "GqlWikiFolder",
                        "abstractKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "args": null,
            "argumentDefinitions": []
          }
        ],
        "storageKey": null
      },
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewWikiPageQuery",
    "selections": [
      {
        "alias": "wiki",
        "args": (v1/*: any*/),
        "concreteType": "GqlWiki",
        "kind": "LinkedField",
        "name": "wikiById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GqlWikiFolder",
            "kind": "LinkedField",
            "name": "rootFolder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "children",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "children",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "children",
                                "plural": true,
                                "selections": [
                                  (v4/*: any*/),
                                  (v5/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v2/*: any*/)
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
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "GqlWikiFolder",
                    "abstractKey": null
                  },
                  (v5/*: any*/)
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
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "GqlWikiPage",
        "kind": "LinkedField",
        "name": "wikiPageById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "content",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "116d25741f168998e1ee198035a8019a",
    "id": null,
    "metadata": {},
    "name": "ViewWikiPageQuery",
    "operationKind": "query",
    "text": "query ViewWikiPageQuery(\n  $wikiId: ID!\n  $wikiPageId: ID!\n) {\n  wiki: wikiById(id: $wikiId) {\n    id\n    name\n    ...WikiSidebarFragment_wiki\n  }\n  wikiPageById(id: $wikiPageId) {\n    ...WikiPageContent_page\n    id\n  }\n}\n\nfragment WikiPageContent_page on GqlWikiPage {\n  name\n  content\n}\n\nfragment WikiSidebarFragment_wiki on GqlWiki {\n  id\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b5421c4d27f80f1ab353960ed28f8458";

export default node;
