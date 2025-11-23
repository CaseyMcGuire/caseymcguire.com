/**
 * @generated SignedSource<<b76a79804da9e48698c4cd2884ce54d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkoutTrackerCreateExercisePageMutation$variables = {
  name?: string | null | undefined;
};
export type WorkoutTrackerCreateExercisePageMutation$data = {
  readonly createExercise: {
    readonly exercise?: {
      readonly id: string;
    };
    readonly success: boolean;
    readonly userFacingErrorMessage?: string | null | undefined;
  } | null | undefined;
};
export type WorkoutTrackerCreateExercisePageMutation = {
  response: WorkoutTrackerCreateExercisePageMutation$data;
  variables: WorkoutTrackerCreateExercisePageMutation$variables;
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
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "success",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Exercise",
      "kind": "LinkedField",
      "name": "exercise",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SuccessfulExerciseMutationResponse",
  "abstractKey": null
},
v4 = {
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
  "type": "FailedExerciseMutationResponse",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkoutTrackerCreateExercisePageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createExercise",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
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
    "name": "WorkoutTrackerCreateExercisePageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createExercise",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8a834af768e60fe7be446e237be76f08",
    "id": null,
    "metadata": {},
    "name": "WorkoutTrackerCreateExercisePageMutation",
    "operationKind": "mutation",
    "text": "mutation WorkoutTrackerCreateExercisePageMutation(\n  $name: String\n) {\n  createExercise(name: $name) {\n    __typename\n    success\n    ... on SuccessfulExerciseMutationResponse {\n      exercise {\n        id\n      }\n    }\n    ... on FailedExerciseMutationResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "240adce5d7bda033b9e274fb13a609be";

export default node;
