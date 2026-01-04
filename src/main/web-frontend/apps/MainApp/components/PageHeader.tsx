import NavigationBar from "apps/MainApp/components/NavigationBar";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  pageHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 5,
  },
  name: {
    fontSize: 30,
  },
});

interface Props {
  onMenuButtonClick: () => void;
}

export default function PageHeader(props: Props) {
  return (
    <div {...stylex.props(styles.pageHeaderContainer)}>
      <div>
        <span {...stylex.props(styles.name)}>Casey McGuire</span>
      </div>
      <NavigationBar onMenuButtonClick={props.onMenuButtonClick} />
    </div>
  );
}
