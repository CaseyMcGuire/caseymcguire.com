/**
 * @generated SignedSource<<376df904b9e58e772b0f6893119a0827>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebarItemNameMutation$variables = {
  id: string;
  name: string;
};
export type WikiSidebarItemNameMutation$data = {
  readonly updateWikiPageOrFolderName: {
    readonly __typename: "FailedWikiResponse";
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "SuccessfulUpdateWikiPageNameResponse";
    readonly wiki: {
      readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarFragment_wiki">;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type WikiSidebarItemNameMutation = {
  response: WikiSidebarItemNameMutation$data;
  variables: WikiSidebarItemNameMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "type": "GqlWikiPage",
  "abstractKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userFacingErrorMessage",
      "storageKey": null
    }
  ],
  "type": "FailedWikiResponse",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiSidebarItemNameMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "updateWikiPageOrFolderName",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GqlWiki",
                "kind": "LinkedField",
                "name": "wiki",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineDataFragmentSpread",
                    "name": "WikiSidebarFragment_wiki",
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "GqlWikiFolder",
                        "kind": "LinkedField",
                        "name": "rootFolder",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "children",
                            "plural": true,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v3/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": null,
                                    "kind": "LinkedField",
                                    "name": "children",
                                    "plural": true,
                                    "selections": [
                                      (v2/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v3/*: any*/),
                                          (v4/*: any*/),
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
              }
            ],
            "type": "SuccessfulUpdateWikiPageNameResponse",
            "abstractKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WikiSidebarItemNameMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "updateWikiPageOrFolderName",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GqlWiki",
                "kind": "LinkedField",
                "name": "wiki",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GqlWikiFolder",
                    "kind": "LinkedField",
                    "name": "rootFolder",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "children",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "children",
                                "plural": true,
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v3/*: any*/),
                                      (v4/*: any*/),
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
                                              (v3/*: any*/)
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
            ],
            "type": "SuccessfulUpdateWikiPageNameResponse",
            "abstractKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "598eb77e10fb72a8c7c0db0686dd00c8",
    "id": null,
    "metadata": {},
    "name": "WikiSidebarItemNameMutation",
    "operationKind": "mutation",
    "text": "mutation WikiSidebarItemNameMutation(\n  $id: ID!\n  $name: String!\n) {\n  updateWikiPageOrFolderName(id: $id, name: $name) {\n    __typename\n    ... on SuccessfulUpdateWikiPageNameResponse {\n      wiki {\n        ...WikiSidebarFragment_wiki\n        id\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n\nfragment WikiSidebarFragment_wiki on GqlWiki {\n  id\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b0a63049ea2d519ce68ca17ce0fb8d89";

export default node;
