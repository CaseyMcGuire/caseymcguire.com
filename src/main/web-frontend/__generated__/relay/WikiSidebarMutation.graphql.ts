/**
 * @generated SignedSource<<5a53187cd248d429aaa40615c177d7e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebarMutation$variables = {
  afterSiblingId?: string | null | undefined;
  beforeSiblingId?: string | null | undefined;
  destinationParentFolderId: string;
  itemId: string;
  wikiId: string;
};
export type WikiSidebarMutation$data = {
  readonly moveWikiItem: {
    readonly __typename: "FailedWikiResponse";
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "SuccessfulMoveWikiItemResponse";
    readonly wiki: {
      readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
    } | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
};
export type WikiSidebarMutation = {
  response: WikiSidebarMutation$data;
  variables: WikiSidebarMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "afterSiblingId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "beforeSiblingId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "destinationParentFolderId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "wikiId"
},
v5 = [
  {
    "kind": "Variable",
    "name": "afterSiblingId",
    "variableName": "afterSiblingId"
  },
  {
    "kind": "Variable",
    "name": "beforeSiblingId",
    "variableName": "beforeSiblingId"
  },
  {
    "kind": "Variable",
    "name": "destinationParentFolderId",
    "variableName": "destinationParentFolderId"
  },
  {
    "kind": "Variable",
    "name": "itemId",
    "variableName": "itemId"
  },
  {
    "kind": "Variable",
    "name": "wikiId",
    "variableName": "wikiId"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v9/*: any*/),
    (v8/*: any*/)
  ],
  "type": "GqlWikiPage",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiSidebarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "moveWikiItem",
        "plural": false,
        "selections": [
          (v6/*: any*/),
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
            "type": "SuccessfulMoveWikiItemResponse",
            "abstractKey": null
          },
          (v7/*: any*/)
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
      (v4/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "WikiSidebarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "moveWikiItem",
        "plural": false,
        "selections": [
          (v6/*: any*/),
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
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GqlWikiFolder",
                    "kind": "LinkedField",
                    "name": "rootFolder",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "children",
                        "plural": true,
                        "selections": [
                          (v6/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/),
                              (v8/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "children",
                                "plural": true,
                                "selections": [
                                  (v6/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v9/*: any*/),
                                      (v8/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": null,
                                        "kind": "LinkedField",
                                        "name": "children",
                                        "plural": true,
                                        "selections": [
                                          (v6/*: any*/),
                                          (v10/*: any*/),
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              (v9/*: any*/)
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
                                  (v10/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "GqlWikiFolder",
                            "abstractKey": null
                          },
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "SuccessfulMoveWikiItemResponse",
            "abstractKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5e046c23160897acc356bbd7fe15a239",
    "id": null,
    "metadata": {},
    "name": "WikiSidebarMutation",
    "operationKind": "mutation",
    "text": "mutation WikiSidebarMutation(\n  $wikiId: ID!\n  $itemId: ID!\n  $destinationParentFolderId: ID!\n  $beforeSiblingId: ID\n  $afterSiblingId: ID\n) {\n  moveWikiItem(wikiId: $wikiId, itemId: $itemId, destinationParentFolderId: $destinationParentFolderId, beforeSiblingId: $beforeSiblingId, afterSiblingId: $afterSiblingId) {\n    __typename\n    ... on SuccessfulMoveWikiItemResponse {\n      wiki {\n        ...WikiSidebar_wiki\n        id\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n\nfragment WikiSidebar_wiki on GqlWiki {\n  name\n  rootFolder {\n    id\n    name\n    children {\n      __typename\n      ... on GqlWikiFolder {\n        id\n        name\n        children {\n          __typename\n          ... on GqlWikiFolder {\n            id\n            name\n            children {\n              __typename\n              ... on GqlWikiPage {\n                id\n                name\n              }\n              ... on GqlWikiFolder {\n                id\n              }\n            }\n          }\n          ... on GqlWikiPage {\n            id\n            name\n          }\n        }\n      }\n      ... on GqlWikiPage {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0d46018e38854012bc98d5afd47c4024";

export default node;
