/**
 * @generated SignedSource<<2e28fd5be2528c820d5d8d16d1e863ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type WorkoutTrackerRootQuery$variables = {};
export type WorkoutTrackerRootQuery$data = {
  readonly workoutTracker: {
    readonly workouts: ReadonlyArray<{
      readonly description: string | null;
      readonly id: string;
    } | null> | null;
  } | null;
};
export type WorkoutTrackerRootQuery = {
  response: WorkoutTrackerRootQuery$data;
  variables: WorkoutTrackerRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "args": null,
        "concreteType": "Workout",
        "kind": "LinkedField",
        "name": "workouts",
        "plural": true,
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
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkoutTrackerRootQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkoutTrackerRootQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "479bddc3f84fad52853d68a3d53f18c1",
    "id": null,
    "metadata": {},
    "name": "WorkoutTrackerRootQuery",
    "operationKind": "query",
    "text": "query WorkoutTrackerRootQuery {\n  workoutTracker {\n    workouts {\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c4df91cfcaf8065c657704f5189af526";

export default node;
