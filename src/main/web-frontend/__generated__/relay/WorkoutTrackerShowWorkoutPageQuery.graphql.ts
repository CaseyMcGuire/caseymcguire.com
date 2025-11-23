/**
 * @generated SignedSource<<6b465cc8e1422a33e921619be9d6d4d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorkoutTrackerShowWorkoutPageQuery$variables = {
  id: string;
};
export type WorkoutTrackerShowWorkoutPageQuery$data = {
  readonly workoutTracker: {
    readonly workoutById: {
      readonly description: string | null | undefined;
      readonly id: string;
      readonly sets: ReadonlyArray<{
        readonly exercise: {
          readonly id: string;
          readonly name: string;
        };
        readonly numReps: number;
        readonly weight: number;
      } | null | undefined>;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"WorkoutTrackerExerciseSection_workoutTracker">;
  } | null | undefined;
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
  "name": "weight",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numReps",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "exercise",
  "plural": false,
  "selections": (v6/*: any*/),
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorkoutTrackerExerciseSection_workoutTracker"
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
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Exercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": (v6/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "25f4745f9ce34d0c2097c00cee71437f",
    "id": null,
    "metadata": {},
    "name": "WorkoutTrackerShowWorkoutPageQuery",
    "operationKind": "query",
    "text": "query WorkoutTrackerShowWorkoutPageQuery(\n  $id: ID!\n) {\n  workoutTracker {\n    workoutById(id: $id) {\n      id\n      description\n      sets {\n        weight\n        numReps\n        exercise {\n          id\n          name\n        }\n        id\n      }\n    }\n    ...WorkoutTrackerExerciseSection_workoutTracker\n  }\n}\n\nfragment WorkoutTrackerExerciseSection_workoutTracker on WorkoutTracker {\n  exercises {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b8795a2a49d9a43cbd9691b527768f7";

export default node;
