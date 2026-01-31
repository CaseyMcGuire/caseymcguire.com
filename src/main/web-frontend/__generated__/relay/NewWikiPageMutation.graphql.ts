/**
 * @generated SignedSource<<6df166d9a9d584e3c841de8dcfda1092>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type NewWikiPageMutation$variables = {
  name: string;
};
export type NewWikiPageMutation$data = {
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
export type NewWikiPageMutation = {
  response: NewWikiPageMutation$data;
  variables: NewWikiPageMutation$variables;
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
    "name": "NewWikiPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewWikiPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7af81b08a358cf06255f9993d55a7bf1",
    "id": null,
    "metadata": {},
    "name": "NewWikiPageMutation",
    "operationKind": "mutation",
    "text": "mutation NewWikiPageMutation(\n  $name: String!\n) {\n  createWiki(name: $name) {\n    __typename\n    ... on SuccessfulCreateWikiResponse {\n      wiki {\n        id\n        name\n      }\n    }\n    ... on FailedWikiResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3104d32bb3be80ae26ede814e91beec0";

export default node;
