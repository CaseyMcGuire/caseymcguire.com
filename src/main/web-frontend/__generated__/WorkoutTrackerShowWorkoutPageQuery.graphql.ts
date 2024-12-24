/**
 * @generated SignedSource<<88158029aa24d81a633989f776315cef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type WorkoutTrackerShowWorkoutPageQuery$variables = {
  id: string;
};
export type WorkoutTrackerShowWorkoutPageQuery$data = {
  readonly workoutTracker: {
    readonly workoutById: {
      readonly description: string | null;
      readonly id: string;
      readonly sets: ReadonlyArray<{
        readonly numReps: number;
      } | null>;
    } | null;
  } | null;
};
export type WorkoutTrackerShowWorkoutPageQuery = {
  response: WorkoutTrackerShowWorkoutPageQuery$data;
  variables: WorkoutTrackerShowWorkoutPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numReps",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkoutTrackerShowWorkoutPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "WorkoutTracker",
        "kind": "LinkedField",
        "name": "workoutTracker",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Workout",
            "kind": "LinkedField",
            "name": "workoutById",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkoutSet",
                "kind": "LinkedField",
                "name": "sets",
                "plural": true,
                "selections": [
                  (v4/*: any*/)
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WorkoutTrackerShowWorkoutPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "WorkoutTracker",
        "kind": "LinkedField",
        "name": "workoutTracker",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Workout",
            "kind": "LinkedField",
            "name": "workoutById",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkoutSet",
                "kind": "LinkedField",
                "name": "sets",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c47a7f41e2cd914e616f8b7ec798c913",
    "id": null,
    "metadata": {},
    "name": "WorkoutTrackerShowWorkoutPageQuery",
    "operationKind": "query",
    "text": "query WorkoutTrackerShowWorkoutPageQuery(\n  $id: ID!\n) {\n  workoutTracker {\n    workoutById(id: $id) {\n      id\n      description\n      sets {\n        numReps\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ca70b6a98a48b72a9b09701870725310";

export default node;
