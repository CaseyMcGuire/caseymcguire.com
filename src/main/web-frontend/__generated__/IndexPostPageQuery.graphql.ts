/* tslint:disable */
/* eslint-disable */
/* @relayHash 689705197e742c62f1e70c1eb49fb495 */

import { ConcreteRequest } from "relay-runtime";
export type IndexPostPageQueryVariables = {
    page: number;
};
export type IndexPostPageQueryResponse = {
    readonly posts: ReadonlyArray<{
        readonly postId: number;
        readonly title: string;
        readonly contents: string;
        readonly publishedDate: string;
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
    postId: id
    title
    contents
    publishedDate: published_date
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
                    "alias": "postId",
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
                    "name": "contents",
                    "args": null,
                    "storageKey": null
                },
                {
                    "kind": "ScalarField",
                    "alias": "publishedDate",
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
            "text": "query IndexPostPageQuery(\n  $page: Int!\n) {\n  posts(page: $page) {\n    postId: id\n    title\n    contents\n    publishedDate: published_date\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '35a960a41798a62bb26917943071117b';
export default node;
