/**
 * @generated SignedSource<<3bddb60a9f56c4f97d5ec96d3b52996b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiFolderActionsButtonMutation$variables = {
  itemId: string;
};
export type WikiFolderActionsButtonMutation$data = {
  readonly deleteWikiItem: {
    readonly __typename: "FailedWikiResponse";
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "SuccessfulDeleteWikiItem";
    readonly wiki: {
      readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
    } | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
};
export type WikiFolderActionsButtonMutation = {
  response: WikiFolderActionsButtonMutation$data;
  variables: WikiFolderActionsButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "itemId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "itemId",
    "variableName": "itemId"
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
    "name": "WikiFolderActionsButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "deleteWikiItem",
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
            "type": "SuccessfulDeleteWikiItem",
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
    "name": "WikiFolderActionsButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "deleteWikiItem",
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
            "type": "SuccessfulDeleteWikiItem",
            "abstractKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1b2bd72324ea38d51474250da2ab7016",
    "id": null,
    "metadata": {},
    "name": "WikiFolderActionsButtonMutation",
    "operationKind": "mutation",
    "text": "mutation WikiFolderActionsButtonMutation(\n  $itemId: ID!\n) {\n  deleteWikiItem(itemId: $itemId) {\n    __typename\n    ... on SuccessfulDeleteWikiItem {\n      wiki {\n        ...WikiSidebar_wiki\n        id\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n\nfragment WikiSidebar_wiki on GqlWiki {\n  id\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c02fd35d315ac48615d2603f939387b2";

export default node;
