import * as React from "react";
import {createUseStyles} from "react-jss";
import {useEffect, useState} from "react";

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
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(
      () => setIsShown(() => true),
      1000
    );
    return () => {
      window.clearTimeout(timer);
    }
  }, [isShown])
  const styles = useStyles();
  if (!isShown) {
    return null;
  }
  return (
    <div style={{...props}} className={styles.shimmerContainer}/>
  );
}
