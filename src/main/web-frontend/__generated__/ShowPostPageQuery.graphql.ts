/* tslint:disable */
/* eslint-disable */
/* @relayHash dc96aa8f22a401dde48ab920c1eea8d4 */

import { ConcreteRequest } from "relay-runtime";
export type ShowPostPageQueryVariables = {
    id: number;
};
export type ShowPostPageQueryResponse = {
    readonly post: {
        readonly title: string;
        readonly contents: string;
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
            "text": "query ShowPostPageQuery(\n  $id: Int!\n) {\n  post(id: $id) {\n    title\n    contents\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '9028b21885221e8ff91b8444f839487a';
export default node;
