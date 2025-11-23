/**
 * @generated SignedSource<<b3e65faa25d52403154389251cbcc31c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorkoutTrackerExerciseSection_workoutTracker$data = {
  readonly exercises: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "WorkoutTrackerExerciseSection_workoutTracker";
};
export type WorkoutTrackerExerciseSection_workoutTracker$key = {
  readonly " $data"?: WorkoutTrackerExerciseSection_workoutTracker$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorkoutTrackerExerciseSection_workoutTracker">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkoutTrackerExerciseSection_workoutTracker",
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
  "type": "WorkoutTracker",
  "abstractKey": null
};

(node as any).hash = "b6ad68330a193831d64827994555c928";

export default node;
