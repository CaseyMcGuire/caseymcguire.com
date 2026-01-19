import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "./WikiStyles.stylex";
import {ReactNode} from "react";

const styles = stylex.create({
  header: {
    width: '100%',
    height: WikiStyles.headerHeight,
    borderBottomStyle: "solid",
    backgroundColor: "rgb(255, 255, 255)",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(229, 231, 235)",
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',

  },
  headerText: {
    fontSize: 24,
    paddingLeft: 12,
    fontWeight: 'bold'
  },
  container: {
    paddingTop: WikiStyles.headerHeight
  }
});

export default function WikiPageWrapper(
  props: {
  children: ReactNode
  }) {
    return (
      <div>
        <div {...stylex.props(styles.header)}>
          <span {...stylex.props(styles.headerText)}>WikiMate</span>
        </div>
        <div {...stylex.props(styles.container)}>
          {props.children}
        </div>
      </div>
    );
}