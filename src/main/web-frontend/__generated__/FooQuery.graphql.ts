/* tslint:disable */
/* eslint-disable */
/* @relayHash e1cb54ae04b376aa70c8aa5b7e1a6c14 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FooQueryVariables = {
    baz: string;
};
export type FooQueryResponse = {
    readonly bar: string;
    readonly " $fragmentRefs": FragmentRefs<"FooBar_murp">;
};
export type FooQuery = {
    readonly response: FooQueryResponse;
    readonly variables: FooQueryVariables;
};



/*
query FooQuery(
  $baz: String!
) {
  bar(baz: $baz)
  ...FooBar_murp
}

fragment FooBar_murp on Query {
  foo
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "baz",
            "type": "String!",
            "defaultValue": null
        } as any)
    ], v1 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "bar",
        "args": [
            {
                "kind": "Variable",
                "name": "baz",
                "variableName": "baz"
            }
        ],
        "storageKey": null
    } as any);
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "FooQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                (v1 /*: any*/),
                {
                    "kind": "FragmentSpread",
                    "name": "FooBar_murp",
                    "args": null
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "FooQuery",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                (v1 /*: any*/),
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "foo",
                    "args": null,
                    "storageKey": null
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "FooQuery",
            "id": null,
            "text": "query FooQuery(\n  $baz: String!\n) {\n  bar(baz: $baz)\n  ...FooBar_murp\n}\n\nfragment FooBar_murp on Query {\n  foo\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'c3e9c65cdd9c9345a743f9e336ded635';
export default node;
