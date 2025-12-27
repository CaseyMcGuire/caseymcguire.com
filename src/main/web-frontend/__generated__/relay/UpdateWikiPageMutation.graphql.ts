/**
 * @generated SignedSource<<9d734663b80cbc9f8a00750cdd6557b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateWikiPageMutation$variables = {
  contents: string;
  id: string;
};
export type UpdateWikiPageMutation$data = {
  readonly updateWikiPageContent: {
    readonly __typename: "FailedWikiResponse";
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "SuccessfulUpdateWikiPageContentResponse";
    readonly wikiPage: {
      readonly content: string;
      readonly id: string;
      readonly name: string;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type UpdateWikiPageMutation = {
  response: UpdateWikiPageMutation$data;
  variables: UpdateWikiPageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "contents"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "content",
        "variableName": "contents"
      },
      {
        "kind": "Variable",
        "name": "pageId",
        "variableName": "id"
      }
    ],
    "concreteType": null,
    "kind": "LinkedField",
    "name": "updateWikiPageContent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GqlWikiPage",
            "kind": "LinkedField",
            "name": "wikiPage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "type": "SuccessfulUpdateWikiPageContentResponse",
        "abstractKey": null
      },
      {
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateWikiPageMutation",
    "selections": (v2/*: any*/),
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
    "name": "UpdateWikiPageMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "cf84d2d3bcb725f86e9e3e5e4abaedca",
    "id": null,
    "metadata": {},
    "name": "UpdateWikiPageMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateWikiPageMutation(\n  $id: ID!\n  $contents: String!\n) {\n  updateWikiPageContent(pageId: $id, content: $contents) {\n    __typename\n    ... on SuccessfulUpdateWikiPageContentResponse {\n      wikiPage {\n        id\n        name\n        content\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3fd006b51c237966b11082282b81be37";

export default node;
