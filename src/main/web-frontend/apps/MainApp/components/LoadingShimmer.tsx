import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const shimmer = stylex.keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0.25,
  },
});

const styles = stylex.create({
  shimmerContainer: {
    backgroundColor: "#e3e3e3",
    animationName: shimmer,
    animationDuration: "1s",
    animationDirection: "alternate",
    animationIterationCount: "infinite",
    borderRadius: 12,
  },
});

type LoadingShimmerProps = {
  height: number;
  width: number | string;
  marginBottom?: number;
};

export default function LoadingShimmer(props: LoadingShimmerProps) {
  const { height, width, marginBottom } = props;

  return (
    <div
      {...stylex.props(styles.shimmerContainer)}
      style={{
        height,
        width,
        ...(marginBottom != null ? { marginBottom } : {}),
      }}
    />
  );
}