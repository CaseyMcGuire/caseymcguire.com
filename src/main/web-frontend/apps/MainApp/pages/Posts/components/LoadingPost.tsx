import * as React from "react";
import LoadingShimmer from "apps/MainApp/components/LoadingShimmer";
import PostShell from "apps/MainApp/pages/Posts/components/PostShell";
import {useDelay} from "utils/useDelay";

export default function LoadingPost() {
  const isVisible = useDelay(500);
  if (!isVisible) {
    return <div />;
  }

  return (
    <PostShell>
      <PostShell.Title>
        <LoadingShimmer marginBottom={4} height={16} width={150} />
        <LoadingShimmer marginBottom={4} height={16} width={50} />
      </PostShell.Title>
      <PostShell.Contents>
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
        <LoadingShimmer marginBottom={4} height={16} width="100%" />
      </PostShell.Contents>
    </PostShell>
  );
}
