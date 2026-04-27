import * as stylex from "@stylexjs/stylex";
import {Folder, LucideIcon, StickyNote} from "lucide-react";
import {RefObject} from "react";

type Props = {
  visible: boolean,
  items: WikiSidebarMenuFlyoutItem[],
  ref?: RefObject<HTMLDivElement>
}

export type WikiSidebarMenuFlyoutItem = {
  text: string,
  icon: LucideIcon,
  onClick: () => void
}

const styles = stylex.create({
  body: {
    position: 'absolute',
    bottom: '90%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRadius: 4,
    minWidth: 225,
  },
  hide: {
    display: 'none'
  },
  list: {
    listStyleType: 'none',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    paddingBlock: 8,
    paddingLeft: 8,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: 'rgb(243, 244, 246)'
    },
  },
  icon: {
    marginRight: 8,
  }
})

export default function WikiSidebarMenuFlyout(props: Props) {

  return (
    <div
      ref={props.ref}
      sx={[styles.body, !props.visible && styles.hide]}>
      <ul sx={styles.list}>
        {
          props.items.map(item => {
            return (
              <li
                key={item.text}
                sx={styles.listItem}
                onClick={item.onClick}>
                <item.icon sx={styles.icon} size={16} color={'black'} />
                {item.text}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}