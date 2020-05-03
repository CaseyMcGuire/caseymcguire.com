/* tslint:disable */
/* eslint-disable */
/* @relayHash 28d07154b2801a59c46249bf2cbc01ae */

import { ConcreteRequest } from "relay-runtime";
export type ShowPostPageQueryVariables = {
    id: string;
};
export type ShowPostPageQueryResponse = {
    readonly post: {
        readonly id: string;
        readonly title: string;
        readonly content: string;
    };
};
export type ShowPostPageQuery = {
    readonly response: ShowPostPageQueryResponse;
    readonly variables: ShowPostPageQueryVariables;
};



/*
query ShowPostPageQuery(
  $id: String!
) {
  post(id: $id) {
    id
    title
    content
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "id",
            "type": "String!",
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
                    "name": "id",
                    "args": null,
                    "storageKey": null
                },
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
                    "name": "content",
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
            "text": "query ShowPostPageQuery(\n  $id: String!\n) {\n  post(id: $id) {\n    id\n    title\n    content\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'a33d7f8ccc2a4e03a65a325386215d18';
export default node;
