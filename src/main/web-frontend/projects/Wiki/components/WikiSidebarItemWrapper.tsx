import * as stylex from "@stylexjs/stylex";
import {ReactNode} from "react";
import { WikiStyles } from "./WikiStyles.stylex";

type Props = {
  name: string,
  children?: ReactNode
}

const styles = stylex.create({
  item: {
    paddingBlock: WikiStyles.sidebarMenuPaddingBlock,
    paddingInline: WikiStyles.sidebarMenuPaddingInline
  }
})

export default function WikiSidebarItemWrapper(props: Props) {
  return (
    <div {...stylex.props(styles.item)}>
      <div>{props.name}</div>
      {props.children}
    </div>
  )
}