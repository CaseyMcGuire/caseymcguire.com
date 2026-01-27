/**
 * @generated SignedSource<<d6ae7d5f983d0dec1f9d40e1b778ca5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WikiHomePageCreateWikiMutation$variables = {
  name: string;
};
export type WikiHomePageCreateWikiMutation$data = {
  readonly createWiki: {
    readonly __typename: "FailedWikiResponse";
    readonly userFacingErrorMessage: string;
  } | {
    readonly __typename: "SuccessfulCreateWikiResponse";
    readonly wiki: {
      readonly id: string;
      readonly name: string;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type WikiHomePageCreateWikiMutation = {
  response: WikiHomePageCreateWikiMutation$data;
  variables: WikiHomePageCreateWikiMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": null,
    "kind": "LinkedField",
    "name": "createWiki",
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
            "concreteType": "GqlWiki",
            "kind": "LinkedField",
            "name": "wiki",
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
              }
            ],
            "storageKey": null
          }
        ],
        "type": "SuccessfulCreateWikiResponse",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WikiHomePageCreateWikiMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WikiHomePageCreateWikiMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9f91a0853820d9b12ff7b0350a074f22",
    "id": null,
    "metadata": {},
    "name": "WikiHomePageCreateWikiMutation",
    "operationKind": "mutation",
    "text": "mutation WikiHomePageCreateWikiMutation(\n  $name: String!\n) {\n  createWiki(name: $name) {\n    __typename\n    ... on SuccessfulCreateWikiResponse {\n      wiki {\n        id\n        name\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "56be4a038cfaf238fd9cf593491ef291";

export default node;
