/**
 * @generated SignedSource<<ffa48afbe644bd31dcce54d3009ef915>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikisTable_wikis$data = {
  readonly wikis: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly name: string;
      };
    }>;
  };
  readonly " $fragmentType": "WikisTable_wikis";
};
export type WikisTable_wikis$key = {
  readonly " $data"?: WikisTable_wikis$data;
  readonly " $fragmentSpreads": FragmentRefs<"WikisTable_wikis">;
};

import WikisTableQuery_graphql from './WikisTableQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": WikisTableQuery_graphql
    }
  },
  "name": "WikisTable_wikis",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "WikiConnection",
      "kind": "LinkedField",
      "name": "wikis",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "WikiEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GqlWiki",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                }
              ],
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

(node as any).hash = "1493e533bafc424e8ede4a2a99770983";

export default node;
