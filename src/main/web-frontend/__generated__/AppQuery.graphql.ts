/* tslint:disable */
/* eslint-disable */
/* @relayHash ab8170fc5cc215d879895de23cd04965 */

import { ConcreteRequest } from "relay-runtime";
export type AppQueryVariables = {};
export type AppQueryResponse = {
    readonly foo: string;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery {
  foo
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "foo",
            "args": null,
            "storageKey": null
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "AppQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "AppQuery",
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "params": {
            "operationKind": "query",
            "name": "AppQuery",
            "id": null,
            "text": "query AppQuery {\n  foo\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '39ca6af932d266f7ce2990c2c3cce05b';
export default node;
