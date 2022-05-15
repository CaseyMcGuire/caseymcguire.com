/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type IndexPostPageQueryVariables = {
    count: number;
    offset: number;
};
export type IndexPostPageQueryResponse = {
    readonly page: {
        readonly posts: ReadonlyArray<{
            readonly postId: number;
            readonly title: string;
            readonly contents: string;
            readonly publishedDate: string;
        }>;
        readonly hasPreviousPage: boolean;
        readonly hasNextPage: boolean;
    };
};
export type IndexPostPageQuery = {
    readonly response: IndexPostPageQueryResponse;
    readonly variables: IndexPostPageQueryVariables;
};



/*
query IndexPostPageQuery(
  $count: Int!
  $offset: Int!
) {
  page: posts(count: $count, offset: $offset) {
    posts {
      postId: id
      title
      contents
      publishedDate: published_date
    }
    hasPreviousPage
    hasNextPage
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "count"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "offset"
        } as any)
    ], v1 = [
        ({
            "alias": "page",
            "args": [
                {
                    "kind": "Variable",
                    "name": "count",
                    "variableName": "count"
                },
                {
                    "kind": "Variable",
                    "name": "offset",
                    "variableName": "offset"
                }
            ],
            "concreteType": "PostPage",
            "kind": "LinkedField",
            "name": "posts",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
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
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
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
            "cacheID": "5fd822bd66b0b6d78910cd88be8217d3",
            "id": null,
            "metadata": {},
            "name": "IndexPostPageQuery",
            "operationKind": "query",
            "text": "query IndexPostPageQuery(\n  $count: Int!\n  $offset: Int!\n) {\n  page: posts(count: $count, offset: $offset) {\n    posts {\n      postId: id\n      title\n      contents\n      publishedDate: published_date\n    }\n    hasPreviousPage\n    hasNextPage\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'a2445f0b1eef4aac547f1c65768287b1';
export default node;
