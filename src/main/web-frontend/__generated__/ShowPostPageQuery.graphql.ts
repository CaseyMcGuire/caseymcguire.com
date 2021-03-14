/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "id"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "id"
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
                },
                {
                    "alias": null,
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
            "name": "ShowPostPageQuery",
            "selections": (v1 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ShowPostPageQuery",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "7c868f55a718c07fed8fc5cb8522b257",
            "id": null,
            "metadata": {},
            "name": "ShowPostPageQuery",
            "operationKind": "query",
            "text": "query ShowPostPageQuery(\n  $id: Int!\n) {\n  post(id: $id) {\n    title\n    contents\n    published_date\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '2f1b338bafe198a3cb02dc41f6ac5291';
export default node;
