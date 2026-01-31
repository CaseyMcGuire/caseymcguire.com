import * as stylex from "@stylexjs/stylex";
import {MoreHorizontal, Trash2} from "lucide-react";
import React, {useRef, useState} from "react";
import {useOnClickOutside} from "usehooks-ts";

type Props = {
  canDelete: boolean,
  onDelete: () => void
}

const styles = stylex.create({
  menuContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    borderStyle: 'none',
    backgroundColor: 'transparent',
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      cursor: 'pointer',
    },
  },
  menuFlyout: {
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: 6,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    minWidth: 140,
    zIndex: 2,
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
  },
  menuHidden: {
    display: 'none'
  },
  menuList: {
    listStyleType: 'none',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingBlock: 8,
    paddingLeft: 8,
    paddingRight: 12,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: 'rgb(243, 244, 246)'
    },
  },
  menuItemDisabled: {
    color: 'rgba(0, 0, 0, 0.4)',
    ':hover': {
      cursor: 'not-allowed',
      backgroundColor: 'transparent'
    },
  },
})

export default function WikiFolderActionsMenu(props: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <div
      ref={menuRef}
      {...stylex.props(styles.menuContainer)}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Folder actions"
        {...stylex.props(styles.menuButton)}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        <MoreHorizontal size={16} />
      </button>
      <div {...stylex.props(styles.menuFlyout, !menuOpen && styles.menuHidden)}>
        <ul {...stylex.props(styles.menuList)}>
          <li
            title={props.canDelete ? '' : 'Cannot delete folder because it is not empty.'}
            {...stylex.props(styles.menuItem, !props.canDelete && styles.menuItemDisabled)}
            onClick={(event) => {
              event.stopPropagation();
              if (!props.canDelete) {
                return;
              }
              setMenuOpen(false);
              props.onDelete();
            }}
          >
            <Trash2 size={14} />
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
}
