import {postStyles} from "apps/MainApp/pages/Posts/components/PostStyles";
import * as React from "react";
import LoadingShimmer from "apps/MainApp/components/LoadingShimmer";
import {useDelay} from "utils/useDelay";
import * as stylex from "@stylexjs/stylex";

void stylex;
export default function LoadingPost() {
  const isVisible = useDelay(500);
  if (!isVisible) {
    return <div />;
  }

  return (
    <div sx={postStyles.postContainer}>
      <div sx={postStyles.postTitleContainer}>
        <LoadingShimmer marginBottom={4} height={16} width={150} />
        <LoadingShimmer marginBottom={4} height={16} width={50} />
      </div>
      <div sx={postStyles.postContentsContainer}>
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
      </div>
    </div>
  );
}