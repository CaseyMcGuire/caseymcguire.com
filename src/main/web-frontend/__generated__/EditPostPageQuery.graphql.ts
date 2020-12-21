/* tslint:disable */
/* eslint-disable */
/* @relayHash 6ade5a907ad978ebbffa391fdafefaaf */

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
            "kind": "LocalArgument",
            "name": "postId",
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
                    "variableName": "postId"
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
            "name": "EditPostPageQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "EditPostPageQuery",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "query",
            "name": "EditPostPageQuery",
            "id": null,
            "text": "query EditPostPageQuery(\n  $postId: Int!\n) {\n  post(id: $postId) {\n    title\n    contents\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '0930cb2d5485c4194bd7cebcdc2cbedb';
export default node;
