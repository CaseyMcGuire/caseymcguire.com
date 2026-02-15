import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "apps/Wiki/components/WikiStyles.stylex";
import {ReactNode} from "react";
import WikiPageHeader from "apps/Wiki/components/WikiPageHeader";

const styles = stylex.create({
  container: {
    paddingTop: WikiStyles.headerHeight
  }
});

type Props = {
  children: ReactNode,
  wikiName?: string,
  onMenuButtonClick?: () => void
}

export default function WikiPageWrapper(
  props: Props
) {
  return (
    <div>
      <WikiPageHeader onMenuButtonClick={props.onMenuButtonClick}/>
      <div {...stylex.props(styles.container)}>
        {props.children}
      </div>
    </div>
  );
}
