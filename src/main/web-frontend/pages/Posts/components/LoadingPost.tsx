import {usePostStyles} from "./PostHooks";
import * as React from "react";
import LoadingShimmer from "../../../components/LoadingShimmer/LoadingShimmer";
import {useDelay} from "../../../utils/useDelay";

export default function LoadingPost() {
  const styles = usePostStyles();
  const isVisible = useDelay(500);
  if (!isVisible) {
    return <div />;
  }
  return (
    <div className={styles.postContainer}>
      <div className={styles.postTitleContainer}>
        <LoadingShimmer marginBottom={4} height={16} width={150} />
        <LoadingShimmer marginBottom={4} height={16} width={50} />
      </div>
      <div className={styles.postContentsContainer}>
        <LoadingShimmer marginBottom={4} height={16} width={'100%'} />
        <LoadingShimmer marginBottom={4} height={16} width={'100%'} />
        <LoadingShimmer marginBottom={4} height={16} width={'100%'} />
        <LoadingShimmer marginBottom={4} height={16} width={'100%'} />
      </div>
    </div>
  )
}