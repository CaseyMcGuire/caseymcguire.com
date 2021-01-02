import * as React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  '@keyframes shimmer': {
    from: {
      backgroundColor: '#dbdbdb'
    },
    to: {
      backgroundColor: '#f3f3f3'
    }
  },
  shimmerContainer: {
    animationName: '$shimmer',
    animationDuration: '1s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    borderRadius: '12px'
  }
});

export default function LoadingShimmer(props: {
  height: number,
  width: number | string,
  marginBottom?: number
}) {
  const styles = useStyles();
  return (
    <div style={{...props}} className={styles.shimmerContainer}/>
  );
}
