/**
 * @generated SignedSource<<4a386e4fab7319fde069f45d0e587651>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebar_wiki$data = {
  readonly rootFolder: {
    readonly children: ReadonlyArray<{
      readonly __typename: "WikiFolder";
      readonly children: ReadonlyArray<{
        readonly __typename: "WikiFolder";
        readonly children: ReadonlyArray<{
          readonly id?: string;
          readonly name?: string;
        }>;
        readonly id: string;
        readonly name: string;
      } | {
        readonly __typename: "WikiPage";
        readonly id: string;
        readonly name: string;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      }>;
      readonly id: string;
      readonly name: string;
    } | {
      readonly __typename: "WikiPage";
      readonly id: string;
      readonly name: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }>;
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentType": "WikiSidebar_wiki";
};
export type WikiSidebar_wiki$key = {
  readonly " $data"?: WikiSidebar_wiki$data;
  readonly " $fragmentSpreads": FragmentRefs<"WikiSidebar_wiki">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "type": "WikiPage",
  "abstractKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WikiSidebar_wiki",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "WikiFolder",
      "kind": "LinkedField",
      "name": "rootFolder",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "children",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "children",
                  "plural": true,
                  "selections": [
                    (v2/*: any*/),
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        (v0/*: any*/),
                        (v1/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": null,
                          "kind": "LinkedField",
                          "name": "children",
                          "plural": true,
                          "selections": [
                            (v3/*: any*/)
                          ],
                          "storageKey": null
                        }
                      ],
                      "type": "WikiFolder",
                      "abstractKey": null
                    },
                    (v3/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "type": "WikiFolder",
              "abstractKey": null
            },
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Wiki",
  "abstractKey": null
};
})();

(node as any).hash = "e992984a17ffda85a88d1e9ea377829e";

export default node;
