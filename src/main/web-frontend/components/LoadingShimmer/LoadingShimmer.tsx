import * as React from "react";
import {createUseStyles} from "react-jss";
import {useDelay} from "../../utils/useDelay";

const useStyles = createUseStyles({
  '@keyframes shimmer': {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0.25
    }
  },
  shimmerContainer: {
    backgroundColor: '#e3e3e3',
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


