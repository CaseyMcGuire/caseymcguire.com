/**
 * @generated SignedSource<<98b73ac6312de629c7f275890692aa6d>>
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
      readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
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
},
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
v6 = {
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "WikiSidebar_wiki"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "SuccessfulUpdateWikiPageNameResponse",
            "abstractKey": null
          },
          (v3/*: any*/)
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
                          (v2/*: any*/),
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
                                  (v2/*: any*/),
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
                                          (v2/*: any*/),
                                          (v6/*: any*/),
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
                                  (v6/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "GqlWikiFolder",
                            "abstractKey": null
                          },
                          (v6/*: any*/)
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7fecc96a6272fa680cd80ecf8ca950de",
    "id": null,
    "metadata": {},
    "name": "WikiSidebarItemNameMutation",
    "operationKind": "mutation",
    "text": "mutation WikiSidebarItemNameMutation(\n  $id: ID!\n  $name: String!\n) {\n  updateWikiPageOrFolderName(id: $id, name: $name) {\n    __typename\n    ... on SuccessfulUpdateWikiPageNameResponse {\n      wiki {\n        ...WikiSidebar_wiki\n        id\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n\nfragment WikiSidebar_wiki on GqlWiki {\n  id\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6fe5ce7bca7350048494e29b34830d67";

export default node;
