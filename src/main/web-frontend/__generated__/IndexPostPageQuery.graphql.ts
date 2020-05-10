/* tslint:disable */
/* eslint-disable */
/* @relayHash cfe409b9b12001e8672269afbde08c2a */

import { ConcreteRequest } from "relay-runtime";
export type IndexPostPageQueryVariables = {
    page: number;
};
export type IndexPostPageQueryResponse = {
    readonly posts: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
        readonly content: string;
    }>;
};
export type IndexPostPageQuery = {
    readonly response: IndexPostPageQueryResponse;
    readonly variables: IndexPostPageQueryVariables;
};



/*
query IndexPostPageQuery(
  $page: Int!
) {
  posts(page: $page) {
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
            "name": "page",
            "type": "Int!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "posts",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page"
                }
            ],
            "concreteType": "Post",
            "plural": true,
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
            "name": "IndexPostPageQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "IndexPostPageQuery",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "query",
            "name": "IndexPostPageQuery",
            "id": null,
            "text": "query IndexPostPageQuery(\n  $page: Int!\n) {\n  posts(page: $page) {\n    id\n    title\n    content\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '466ab6e288f24185050ee55afefa6d83';
export default node;
