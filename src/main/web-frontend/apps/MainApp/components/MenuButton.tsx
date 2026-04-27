import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  menuButton: {
    padding: 5,
  },
  menuButtonLine: {
    height: 2,
    width: 19,
    backgroundColor: "#2F2F2F",
  },
  // replaces &:nth-child(2), &:nth-child(3)
  menuButtonLineOffset: {
    marginTop: 4,
  },
});

interface Props {
  onClick: () => void;
}

export default function MenuButton(props: Props) {
  return (
    <div sx={styles.menuButton} onClick={props.onClick}>
      <div sx={styles.menuButtonLine} />
      <div
        sx={[styles.menuButtonLine, styles.menuButtonLineOffset]}
      />
      <div
        sx={[styles.menuButtonLine, styles.menuButtonLineOffset]}
      />
    </div>
  );
}
