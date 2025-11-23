/**
 * @generated SignedSource<<d4438e8a2a95e75c6924e1ca41df6ac3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkoutTrackerCreateWorkoutPageMutation$variables = {
  description: string;
};
export type WorkoutTrackerCreateWorkoutPageMutation$data = {
  readonly createWorkout: {
    readonly success: boolean;
    readonly userFacingErrorMessage?: string | null | undefined;
    readonly workout?: {
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type WorkoutTrackerCreateWorkoutPageMutation = {
  response: WorkoutTrackerCreateWorkoutPageMutation$data;
  variables: WorkoutTrackerCreateWorkoutPageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "description"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "description",
    "variableName": "description"
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
      "concreteType": "Workout",
      "kind": "LinkedField",
      "name": "workout",
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
  "type": "SuccessfulWorkoutMutationResponse",
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
  "type": "FailedWorkoutMutationResponse",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkoutTrackerCreateWorkoutPageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createWorkout",
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
    "name": "WorkoutTrackerCreateWorkoutPageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createWorkout",
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
    "cacheID": "afad2c00a3f6a14dcf4471672c214415",
    "id": null,
    "metadata": {},
    "name": "WorkoutTrackerCreateWorkoutPageMutation",
    "operationKind": "mutation",
    "text": "mutation WorkoutTrackerCreateWorkoutPageMutation(\n  $description: String!\n) {\n  createWorkout(description: $description) {\n    __typename\n    success\n    ... on SuccessfulWorkoutMutationResponse {\n      workout {\n        id\n      }\n    }\n    ... on FailedWorkoutMutationResponse {\n      userFacingErrorMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9189e87eaeaa34554c15f882ed58846e";

export default node;
