/* tslint:disable */
/* eslint-disable */
/* @relayHash 99df9bc19e7315a9d65f96a41fe921ba */

import { ConcreteRequest } from "relay-runtime";
export type CreateOrEditPostMutationVariables = {
    id?: number | null;
    title: string;
    content: string;
};
export type CreateOrEditPostMutationResponse = {
    readonly postId: number | null;
};
export type CreateOrEditPostMutation = {
    readonly response: CreateOrEditPostMutationResponse;
    readonly variables: CreateOrEditPostMutationVariables;
};



/*
mutation CreateOrEditPostMutation(
  $id: Int
  $title: String!
  $content: String!
) {
  postId: create_or_edit_post(id: $id, content: $content, title: $title)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "id",
            "type": "Int",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "title",
            "type": "String!",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "content",
            "type": "String!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "ScalarField",
            "alias": "postId",
            "name": "create_or_edit_post",
            "args": [
                {
                    "kind": "Variable",
                    "name": "content",
                    "variableName": "content"
                },
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "id"
                },
                {
                    "kind": "Variable",
                    "name": "title",
                    "variableName": "title"
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "CreateOrEditPostMutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "CreateOrEditPostMutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "CreateOrEditPostMutation",
            "id": null,
            "text": "mutation CreateOrEditPostMutation(\n  $id: Int\n  $title: String!\n  $content: String!\n) {\n  postId: create_or_edit_post(id: $id, content: $content, title: $title)\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '2a0754b9a41e437cc71856cf1d66fdee';
export default node;
