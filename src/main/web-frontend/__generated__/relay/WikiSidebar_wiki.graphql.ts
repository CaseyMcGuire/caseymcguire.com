/**
 * @generated SignedSource<<97b3740cfde903e3cd94e574770f0a5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebar_wiki$data = {
  readonly name: string;
  readonly rootFolder: {
    readonly children: ReadonlyArray<{
      readonly __typename: "GqlWikiFolder";
      readonly children: ReadonlyArray<{
        readonly __typename: "GqlWikiFolder";
        readonly children: ReadonlyArray<{
          readonly id?: string;
          readonly name?: string;
        }>;
        readonly id: string;
        readonly name: string;
      } | {
        readonly __typename: "GqlWikiPage";
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
      readonly __typename: "GqlWikiPage";
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
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
    (v1/*: any*/),
    (v0/*: any*/)
  ],
  "type": "GqlWikiPage",
  "abstractKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WikiSidebar_wiki",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "GqlWikiFolder",
      "kind": "LinkedField",
      "name": "rootFolder",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v0/*: any*/),
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
                (v1/*: any*/),
                (v0/*: any*/),
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
                        (v1/*: any*/),
                        (v0/*: any*/),
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
                      "type": "GqlWikiFolder",
                      "abstractKey": null
                    },
                    (v3/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "type": "GqlWikiFolder",
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
  "type": "GqlWiki",
  "abstractKey": null
};
})();

(node as any).hash = "6a54b4adf471ea9dfd51310c07c692d6";

export default node;
