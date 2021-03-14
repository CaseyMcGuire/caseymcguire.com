/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    var v0 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "content"
    } as any), v1 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "id"
    } as any), v2 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "title"
    } as any), v3 = [
        ({
            "alias": "postId",
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
            "kind": "ScalarField",
            "name": "create_or_edit_post",
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [
                (v0 /*: any*/),
                (v1 /*: any*/),
                (v2 /*: any*/)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "CreateOrEditPostMutation",
            "selections": (v3 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [
                (v1 /*: any*/),
                (v2 /*: any*/),
                (v0 /*: any*/)
            ],
            "kind": "Operation",
            "name": "CreateOrEditPostMutation",
            "selections": (v3 /*: any*/)
        },
        "params": {
            "cacheID": "cd6160b7f3a0fed9893439720db8a2a7",
            "id": null,
            "metadata": {},
            "name": "CreateOrEditPostMutation",
            "operationKind": "mutation",
            "text": "mutation CreateOrEditPostMutation(\n  $id: Int\n  $title: String!\n  $content: String!\n) {\n  postId: create_or_edit_post(id: $id, content: $content, title: $title)\n}\n"
        }
    } as any;
})();
(node as any).hash = '2a0754b9a41e437cc71856cf1d66fdee';
export default node;
