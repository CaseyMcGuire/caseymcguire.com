/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "page"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page"
                }
            ],
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "posts",
            "plural": true,
            "selections": [
                {
                    "alias": "postId",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                },
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
                },
                {
                    "alias": "publishedDate",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "published_date",
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
            "name": "IndexPostPageQuery",
            "selections": (v1 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "IndexPostPageQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "d2826968616d22e6bf31b3ba1b394450",
            "id": null,
            "metadata": {},
            "name": "IndexPostPageQuery",
            "operationKind": "query",
            "text": "query IndexPostPageQuery(\n  $page: Int!\n) {\n  posts(page: $page) {\n    postId: id\n    title\n    contents\n    publishedDate: published_date\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '35a960a41798a62bb26917943071117b';
export default node;
