/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EditPostPageQueryVariables = {
    postId: number;
};
export type EditPostPageQueryResponse = {
    readonly post: {
        readonly title: string;
        readonly contents: string;
    } | null;
};
export type EditPostPageQuery = {
    readonly response: EditPostPageQueryResponse;
    readonly variables: EditPostPageQueryVariables;
};



/*
query EditPostPageQuery(
  $postId: Int!
) {
  post(id: $postId) {
    title
    contents
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "postId"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "postId"
                }
            ],
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "contents",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "EditPostPageQuery",
            "selections": (v1 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "EditPostPageQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "1e3e43bba55e98fbab6a0c3640a6361d",
            "id": null,
            "metadata": {},
            "name": "EditPostPageQuery",
            "operationKind": "query",
            "text": "query EditPostPageQuery(\n  $postId: Int!\n) {\n  post(id: $postId) {\n    title\n    contents\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '0930cb2d5485c4194bd7cebcdc2cbedb';
export default node;
