/**
 * @generated SignedSource<<e69d04e84d8f516e11f058007b635717>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type WorkoutTrackerHomePageQuery$variables = {};
export type WorkoutTrackerHomePageQuery$data = {
  readonly workoutTracker: {
    readonly workouts: ReadonlyArray<{
      readonly description: string | null;
      readonly id: string;
    } | null> | null;
  } | null;
};
export type WorkoutTrackerHomePageQuery = {
  response: WorkoutTrackerHomePageQuery$data;
  variables: WorkoutTrackerHomePageQuery$variables;
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
    "name": "WorkoutTrackerHomePageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkoutTrackerHomePageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "573835aa6dc07271c991333ad6ed0b66",
    "id": null,
    "metadata": {},
    "name": "WorkoutTrackerHomePageQuery",
    "operationKind": "query",
    "text": "query WorkoutTrackerHomePageQuery {\n  workoutTracker {\n    workouts {\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9a974e327518496eb58dd75a1fb0ed2c";

export default node;
