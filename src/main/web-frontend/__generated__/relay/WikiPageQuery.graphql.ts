/**
 * @generated SignedSource<<f5d5712c9aa5788d7eda2d2dc37abcf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiPageQuery$variables = {
  wikiName: string;
};
export type WikiPageQuery$data = {
  readonly wiki: {
    readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
  } | null | undefined;
};
export type WikiPageQuery = {
  response: WikiPageQuery$data;
  variables: WikiPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "wikiName"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "wikiName"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "name": "id",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "type": "WikiPage",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiPageQuery",
    "selections": [
      {
        "alias": "wiki",
        "args": (v1/*: any*/),
        "concreteType": "Wiki",
        "kind": "LinkedField",
        "name": "wikiByName",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WikiSidebar_wiki"
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
    "name": "WikiPageQuery",
    "selections": [
      {
        "alias": "wiki",
        "args": (v1/*: any*/),
        "concreteType": "Wiki",
        "kind": "LinkedField",
        "name": "wikiByName",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sidebar",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "children",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "children",
                            "plural": true,
                            "selections": [
                              (v2/*: any*/),
                              (v5/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v4/*: any*/)
                                ],
                                "type": "WikiFolder",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "type": "WikiFolder",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "type": "WikiFolder",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b504a631ce422f12700c01dbc8029637",
    "id": null,
    "metadata": {},
    "name": "WikiPageQuery",
    "operationKind": "query",
    "text": "query WikiPageQuery(\n  $wikiName: String!\n) {\n  wiki: wikiByName(name: $wikiName) {\n    ...WikiSidebar_wiki\n    id\n  }\n}\n\nfragment NestedWikiSidebarFolder_wikiFolder on WikiFolder {\n  name\n  children {\n    __typename\n    ...WikiSidebarPage_wikiPage\n    ... on WikiFolder {\n      id\n    }\n    ... on WikiPage {\n      id\n    }\n  }\n}\n\nfragment WikiSidebarFolder_wikiFolder on WikiFolder {\n  name\n  children {\n    __typename\n    ...WikiSidebarPage_wikiPage\n    ...NestedWikiSidebarFolder_wikiFolder\n    ... on WikiFolder {\n      id\n    }\n    ... on WikiPage {\n      id\n    }\n  }\n}\n\nfragment WikiSidebarPage_wikiPage on WikiPage {\n  name\n}\n\nfragment WikiSidebar_wiki on Wiki {\n  sidebar {\n    __typename\n    ...WikiSidebarPage_wikiPage\n    ...WikiSidebarFolder_wikiFolder\n    ... on WikiFolder {\n      id\n    }\n    ... on WikiPage {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "45cf63dbac4f70d1321afd2ca1636ff2";

export default node;
