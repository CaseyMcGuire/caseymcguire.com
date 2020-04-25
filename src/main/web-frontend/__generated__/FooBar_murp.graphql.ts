/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FooBar_murp = {
    readonly foo: string;
    readonly " $refType": "FooBar_murp";
};
export type FooBar_murp$data = FooBar_murp;
export type FooBar_murp$key = {
    readonly " $data"?: FooBar_murp$data;
    readonly " $fragmentRefs": FragmentRefs<"FooBar_murp">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "FooBar_murp",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
        {
            "kind": "ScalarField",
            "alias": null,
            "name": "foo",
            "args": null,
            "storageKey": null
        }
    ]
} as any);
(node as any).hash = '105d63b0a6105e18bd91dcaa8eace046';
export default node;
