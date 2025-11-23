/**
 * @generated SignedSource<<b89e294cbfd8278988958caba62a1830>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkoutTrackerExercisesIndexPageQuery$variables = Record<PropertyKey, never>;
export type WorkoutTrackerExercisesIndexPageQuery$data = {
  readonly workoutTracker: {
    readonly exercises: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type WorkoutTrackerExercisesIndexPageQuery = {
  response: WorkoutTrackerExercisesIndexPageQuery$data;
  variables: WorkoutTrackerExercisesIndexPageQuery$variables;
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
        "concreteType": "Exercise",
        "kind": "LinkedField",
        "name": "exercises",
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
            "name": "name",
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
    "name": "WorkoutTrackerExercisesIndexPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkoutTrackerExercisesIndexPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "cb4e7dfcf3cbc60b113e94858766206e",
    "id": null,
    "metadata": {},
    "name": "WorkoutTrackerExercisesIndexPageQuery",
    "operationKind": "query",
    "text": "query WorkoutTrackerExercisesIndexPageQuery {\n  workoutTracker {\n    exercises {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "46c0ccc2404b60492ece21e64cc0d84a";

export default node;
