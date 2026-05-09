/**
 * @generated SignedSource<<305e561cfb620b3551a747cfc7114a08>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AiChatSidebar_query$data = {
  readonly aiConversations: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "AiChatSidebar_query";
};
export type AiChatSidebar_query$key = {
  readonly " $data"?: AiChatSidebar_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"AiChatSidebar_query">;
};

import AiChatSidebarPaginationQuery_graphql from './AiChatSidebarPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "aiConversations"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": AiChatSidebarPaginationQuery_graphql
    }
  },
  "name": "AiChatSidebar_query",
  "selections": [
    {
      "alias": "aiConversations",
      "args": null,
      "concreteType": "AiConversationConnection",
      "kind": "LinkedField",
      "name": "__AiChatSidebar_aiConversations_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AiConversationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AiConversation",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
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
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "1303e4bdfee9873286bfb9b9240ab548";

export default node;
