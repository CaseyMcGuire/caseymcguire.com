import * as React from "react";
import * as stylex from "@stylexjs/stylex";

type Props = {
  score: number
}

const styles = stylex.create({
  tetrisScore: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    fontSize: 24,
  },
});

export default function TetrisScore(props: Props) {
  return (
    <div {...stylex.props(styles.tetrisScore)}>
      <span>Score</span>
      {props.score}
    </div>
  );
}