/**
 * @generated SignedSource<<4829b597b6f6934cbc1eb6419f3fdf0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebarCreateFolderMutation$variables = {
  folderName: string;
  wikiId: string;
};
export type WikiSidebarCreateFolderMutation$data = {
  readonly createWikiFolder: {
    readonly __typename: "FailedWikiResponse";
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "SuccessfulCreateWikiFolderResponse";
    readonly wiki: {
      readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarFragment_wiki">;
    };
    readonly wikiFolder: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type WikiSidebarCreateFolderMutation = {
  response: WikiSidebarCreateFolderMutation$data;
  variables: WikiSidebarCreateFolderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "folderName"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "wikiId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "folderName",
    "variableName": "folderName"
  },
  {
    "kind": "Variable",
    "name": "wikiId",
    "variableName": "wikiId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "GqlWikiFolder",
  "kind": "LinkedField",
  "name": "wikiFolder",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "GqlWikiPage",
  "abstractKey": null
},
v9 = {
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiSidebarCreateFolderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createWikiFolder",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v7/*: any*/),
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
                              (v3/*: any*/),
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
                                      (v3/*: any*/),
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
                    "args": null,
                    "argumentDefinitions": []
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "SuccessfulCreateWikiFolderResponse",
            "abstractKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "WikiSidebarCreateFolderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createWikiFolder",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v7/*: any*/),
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
                          (v3/*: any*/),
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
                                  (v3/*: any*/),
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
                                          (v3/*: any*/),
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
              }
            ],
            "type": "SuccessfulCreateWikiFolderResponse",
            "abstractKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "13b9306c077100c78e01da55e99a0114",
    "id": null,
    "metadata": {},
    "name": "WikiSidebarCreateFolderMutation",
    "operationKind": "mutation",
    "text": "mutation WikiSidebarCreateFolderMutation(\n  $wikiId: ID!\n  $folderName: String!\n) {\n  createWikiFolder(wikiId: $wikiId, folderName: $folderName) {\n    __typename\n    ... on SuccessfulCreateWikiFolderResponse {\n      wikiFolder {\n        id\n        name\n      }\n      wiki {\n        ...WikiSidebarFragment_wiki\n        id\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n\nfragment WikiSidebarFragment_wiki on GqlWiki {\n  id\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "87796a62020f8cffb302000848b0470e";

export default node;
