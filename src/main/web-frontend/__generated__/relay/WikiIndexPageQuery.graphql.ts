/**
 * @generated SignedSource<<dc509f6aeb77de35e66781f18f8e556b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiIndexPageQuery$variables = {
  wikiId: string;
};
export type WikiIndexPageQuery$data = {
  readonly wiki: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
  } | null | undefined;
};
export type WikiIndexPageQuery = {
  response: WikiIndexPageQuery$data;
  variables: WikiIndexPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "wikiId"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiIndexPageQuery",
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
    "name": "WikiIndexPageQuery",
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
      }
    ]
  },
  "params": {
    "cacheID": "d580dc1d63d188d22eca7c5a356b022f",
    "id": null,
    "metadata": {},
    "name": "WikiIndexPageQuery",
    "operationKind": "query",
    "text": "query WikiIndexPageQuery(\n  $wikiId: ID!\n) {\n  wiki: wikiById(id: $wikiId) {\n    id\n    name\n    ...WikiSidebar_wiki\n  }\n}\n\nfragment WikiSidebar_wiki on GqlWiki {\n  id\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fc8e51d615e216f071a138e88adbd852";

export default node;
