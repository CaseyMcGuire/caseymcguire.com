/**
 * @generated SignedSource<<e009fa90a9cdae5057db6e0b680574c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EditWikiPageMutation$variables = {
  contents: string;
  id: string;
  name: string;
};
export type EditWikiPageMutation$data = {
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
export type EditWikiPageMutation = {
  response: EditWikiPageMutation$data;
  variables: EditWikiPageMutation$variables;
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
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v3 = [
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
        "name": "name",
        "variableName": "name"
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditWikiPageMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
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
    "name": "EditWikiPageMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "a64bec97b686de25d0350270d667191a",
    "id": null,
    "metadata": {},
    "name": "EditWikiPageMutation",
    "operationKind": "mutation",
    "text": "mutation EditWikiPageMutation(\n  $id: ID!\n  $name: String!\n  $contents: String!\n) {\n  updateWikiPageContent(pageId: $id, name: $name, content: $contents) {\n    __typename\n    ... on SuccessfulUpdateWikiPageContentResponse {\n      wikiPage {\n        id\n        name\n        content\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f6d16672b6c707bf67eb5905c43c230a";

export default node;
