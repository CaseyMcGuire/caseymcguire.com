/**
 * @generated SignedSource<<fc0cc94df649d9c09920cc062944ec9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WikiSidebarFragment_wiki$data = {
  readonly id: string;
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
  readonly " $fragmentType": "WikiSidebarFragment_wiki";
};
export type WikiSidebarFragment_wiki$key = {
  readonly " $data"?: WikiSidebarFragment_wiki$data;
  readonly " $fragmentSpreads": FragmentRefs<"WikiSidebarFragment_wiki">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "WikiSidebarFragment_wiki"
};

(node as any).hash = "40207686d2dd5e8ef8d139b2f4eab91c";

export default node;
