/* tslint:disable */
/* eslint-disable */
/* @relayHash e968f3cc7792955820b523fddcc9f259 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FooQueryVariables = {};
export type FooQueryResponse = {
    readonly bar: string;
    readonly " $fragmentRefs": FragmentRefs<"FooBar_murp">;
};
export type FooQuery = {
    readonly response: FooQueryResponse;
    readonly variables: FooQueryVariables;
};



/*
query FooQuery {
  bar(baz: "asldkfj")
  ...FooBar_murp
}

fragment FooBar_murp on Query {
  foo
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "bar",
        "args": [
            {
                "kind": "Literal",
                "name": "baz",
                "value": "asldkfj"
            }
        ],
        "storageKey": "bar(baz:\"asldkfj\")"
    } as any);
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "FooQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": [
                (v0 /*: any*/),
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
            "argumentDefinitions": [],
            "selections": [
                (v0 /*: any*/),
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
            "text": "query FooQuery {\n  bar(baz: \"asldkfj\")\n  ...FooBar_murp\n}\n\nfragment FooBar_murp on Query {\n  foo\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'b03a2748be840aaf8f16509cf45220ad';
export default node;
