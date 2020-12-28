/* tslint:disable */
/* eslint-disable */
/* @relayHash f9a8a1a2066d6ae444c3b090ecc78b3e */

import { ConcreteRequest } from "relay-runtime";
export type ShowPostPageQueryVariables = {
    id: number;
};
export type ShowPostPageQueryResponse = {
    readonly post: {
        readonly title: string;
        readonly contents: string;
        readonly published_date: string;
    } | null;
};
export type ShowPostPageQuery = {
    readonly response: ShowPostPageQueryResponse;
    readonly variables: ShowPostPageQueryVariables;
};



/*
query ShowPostPageQuery(
  $id: Int!
) {
  post(id: $id) {
    title
    contents
    published_date
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "id",
            "type": "Int!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "post",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "id"
                }
            ],
            "concreteType": "Post",
            "plural": false,
            "selections": [
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "title",
                    "args": null,
                    "storageKey": null
                },
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "contents",
                    "args": null,
                    "storageKey": null
                },
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "published_date",
                    "args": null,
                    "storageKey": null
                }
            ]
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "ShowPostPageQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "ShowPostPageQuery",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "query",
            "name": "ShowPostPageQuery",
            "id": null,
            "text": "query ShowPostPageQuery(\n  $id: Int!\n) {\n  post(id: $id) {\n    title\n    contents\n    published_date\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '2f1b338bafe198a3cb02dc41f6ac5291';
export default node;
