import {postStyles} from "./PostStyles";
import * as React from "react";
import LoadingShimmer from "components/LoadingShimmer/LoadingShimmer";
import {useDelay} from "utils/useDelay";
import * as stylex from "@stylexjs/stylex";

export default function LoadingPost() {
  const isVisible = useDelay(500);
  if (!isVisible) {
    return <div />;
  }

  return (
    <div {...stylex.props(postStyles.postContainer)}>
      <div {...stylex.props(postStyles.postTitleContainer)}>
        <LoadingShimmer marginBottom={4} height={16} width={150} />
        <LoadingShimmer marginBottom={4} height={16} width={50} />
      </div>
      <div {...stylex.props(postStyles.postContentsContainer)}>
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
      </div>
    </div>
  );
}